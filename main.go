package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	// Manejador para servir archivos estáticos desde la carpeta "static"
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Manejador para la página de inicio (index.html)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/static/templates/index.html", http.StatusFound)
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

	// Mensaje de inicio
	fmt.Println("El servidor está corriendo en http://localhost:8080/")

	// Inicia el servidor en el puerto 8080
	log.Fatal(http.ListenAndServe(":8080", nil))
}
