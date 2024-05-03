package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"path/filepath"
	"regexp"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	// Manejador para servir archivos estáticos desde la carpeta "static"
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Manejador para la página de inicio (index.html)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/static/templates/index.html", http.StatusFound)
	})

	// Manejador para la página de inicio de sesión (login.html)
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.ServeFile(w, r, filepath.Join("static", "templates", "login.html"))
			return
		}

		// Parsear los datos del formulario
		if err := r.ParseForm(); err != nil {
			http.Error(w, "Error al parsear la solicitud", http.StatusBadRequest)
			return
		}

		// Obtener las credenciales del formulario
		usuario := r.FormValue("usuario")
		contrasena := r.FormValue("contrasena")

		// Realizar la consulta a la base de datos para verificar las credenciales
		db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/imox_bd")
		if err != nil {
			http.Error(w, "Error de conexión a la base de datos", http.StatusInternalServerError)
			log.Println("Error de conexión a la base de datos:", err)
			return
		}
		defer db.Close()

		var id int
		err = db.QueryRow("SELECT id FROM usuarios WHERE usuario = ? AND contrasena = ?", usuario, contrasena).Scan(&id)
		if err != nil {
			if err == sql.ErrNoRows {
				// Usuario o contraseña incorrectos, redirigir al usuario de vuelta al formulario de inicio de sesión con un mensaje de error
				http.ServeFile(w, r, filepath.Join("static", "templates", "login.html"))
				fmt.Fprintf(w, "<script>alert('Usuario o contraseña incorrectos');</script>")
				return
			}
			// Error al consultar la base de datos
			http.Error(w, "Error al verificar las credenciales", http.StatusInternalServerError)
			log.Println("Error al verificar las credenciales:", err)
			return
		}

		// Si las credenciales son válidas, redirigir al usuario a la página de inicio
		http.Redirect(w, r, "/", http.StatusFound)
	})

	// Manejador para la página de traducción
	http.HandleFunc("/traducir", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
			return
		}

		// Parsear el texto en español desde la solicitud AJAX
		if err := r.ParseForm(); err != nil {
			http.Error(w, "Error al parsear la solicitud", http.StatusBadRequest)
			return
		}
		spanishText := r.FormValue("textoEspañol")

		// Realizar la consulta a la base de datos
		db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/imox_bd")
		if err != nil {
			http.Error(w, "Error de conexión a la base de datos", http.StatusInternalServerError)
			log.Println("Error de conexión a la base de datos:", err)
			return
		}
		defer db.Close()

		var qeqchiText string
		err = db.QueryRow("SELECT palabra_qeqchi FROM traducciones WHERE palabra_esp = ?", spanishText).Scan(&qeqchiText)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, fmt.Sprintf("No se encontró una traducción para el texto en español: %s", spanishText), http.StatusNotFound)
			} else {
				http.Error(w, "Error al consultar la base de datos", http.StatusInternalServerError)
				log.Println("Error al consultar la base de datos:", err)
			}
			return
		}

		// Enviar la traducción como respuesta
		response := struct {
			QeqchiText string `json:"qeqchiText"`
		}{
			QeqchiText: qeqchiText,
		}
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, "Error al codificar la respuesta JSON", http.StatusInternalServerError)
			log.Println("Error al codificar la respuesta JSON:", err)
			return
		}
	})

	// Manejador para la página de registro
	http.HandleFunc("/registro", handleRegistro)

	// Mensaje de inicio
	fmt.Println("El servidor está corriendo en http://localhost:8080/")

	// Inicia el servidor en el puerto 8080
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// Función para manejar el registro de usuarios
func handleRegistro(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	// Parsear los datos del formulario
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Error al parsear la solicitud", http.StatusBadRequest)
		return
	}

	// Obtener los datos del formulario
	nombre := r.FormValue("nombre")
	correo := r.FormValue("correo")
	usuario := r.FormValue("usuario")
	contrasena := r.FormValue("contrasena")

	// Validar los campos del formulario
	if nombre == "" || correo == "" || usuario == "" || contrasena == "" {
		http.Error(w, "Todos los campos son requeridos", http.StatusBadRequest)
		return
	}

	// Validar el formato del correo electrónico
	if !validarFormatoCorreo(correo) {
		http.Error(w, "Formato de correo electrónico inválido", http.StatusBadRequest)
		return
	}

	// Realizar la conexión a la base de datos
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/imox_bd")
	if err != nil {
		http.Error(w, "Error de conexión a la base de datos", http.StatusInternalServerError)
		log.Println("Error de conexión a la base de datos:", err)
		return
	}
	defer db.Close()

	// Verificar si el correo electrónico ya está en uso
	var correoExistente bool
	err = db.QueryRow("SELECT EXISTS (SELECT 1 FROM usuarios WHERE correo_electronico = ?)", correo).Scan(&correoExistente)
	if err != nil {
		http.Error(w, "Error al verificar el correo electrónico", http.StatusInternalServerError)
		log.Println("Error al verificar el correo electrónico:", err)
		return
	}
	if correoExistente {
		// Mostrar un mensaje de alerta en JavaScript y redirigir al usuario al index
		fmt.Fprintf(w, "<script>alert('El correo electrónico ya está en uso'); window.location.href = '/';</script>")
		return
	}

	// Verificar si el nombre de usuario ya está en uso
	var usuarioExistente bool
	err = db.QueryRow("SELECT EXISTS (SELECT 1 FROM usuarios WHERE usuario = ?)", usuario).Scan(&usuarioExistente)
	if err != nil {
		http.Error(w, "Error al verificar el nombre de usuario", http.StatusInternalServerError)
		log.Println("Error al verificar el nombre de usuario:", err)
		return
	}
	if usuarioExistente {
		// Mostrar un mensaje de alerta en JavaScript y redirigir al usuario al index
		fmt.Fprintf(w, "<script>alert('El nombre de usuario ya está en uso'); window.location.href = '/';</script>")
		return
	}

	// Insertar el nuevo usuario en la base de datos
	_, err = db.Exec("INSERT INTO usuarios (nombre_completo, correo_electronico, usuario, contrasena) VALUES (?, ?, ?, ?)", nombre, correo, usuario, contrasena)
	if err != nil {
		http.Error(w, "Error al registrar el usuario", http.StatusInternalServerError)
		log.Println("Error al registrar el usuario:", err)
		return
	}

	// Respuesta de éxito
	w.WriteHeader(http.StatusOK)
	// Mostrar un mensaje de alerta
	fmt.Fprintf(w, "<script>alert('Usuario registrado exitosamente'); window.location.href = '/';</script>")
}

// Función para validar el formato del correo electrónico
func validarFormatoCorreo(correo string) bool {
	// Patrón para validar el formato del correo electrónico
	patron := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	// Compilar el patrón en una expresión regular
	expReg := regexp.MustCompile(patron)
	// Verificar si el correo cumple con el formato esperado
	return expReg.MatchString(correo)
}
