package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Manejador para servir archivos estáticos desde la carpeta "static"
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Manejador para la página de inicio (index.html)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/static/templates/index.html", http.StatusFound)
	})

	// Manejador para la página de login
	http.HandleFunc("/login.html", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/templates/login.html")
	})

	// Mensaje de inicio
	fmt.Println("El servidor está corriendo en http://localhost:8080/")

	// Inicia el servidor en el puerto 8080
	http.ListenAndServe(":8080", nil)
}
