http.HandleFunc("/traducir", func(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	// Parsear el texto desde la solicitud AJAX
	if err := r.ParseForm(); err != nil {
		http.Error(w, "Error al parsear la solicitud", http.StatusBadRequest)
		return
	}

	spanishText := r.FormValue("textoEspañol")
	qeqchiText := r.FormValue("textoQeqchi")

	// Realizar la conexión a la base de datos
	db, err := sql.Open("mysql", "root:@tcp(localhost:3306)/imox_bd")
	if err != nil {
		http.Error(w, "Error de conexión a la base de datos", http.StatusInternalServerError)
		log.Println("Error de conexión a la base de datos:", err)
		return
	}
	defer db.Close()

	var response struct {
		SpanishText string `json:"spanishText"`
		QeqchiText  string `json:"qeqchiText"`
		AudioES     string `json:"audio_es"`
		AudioQeq    string `json:"audio_qeq"`
	}

	// Si se proporciona texto en español, traducir a Q'eqchi'
	if spanishText != "" {
		err = db.QueryRow("SELECT palabra_qeqchi, audio_esp, audio_qeqchi FROM traducciones WHERE palabra_esp = ?", spanishText).Scan(&response.QeqchiText, &response.AudioES, &response.AudioQeq)
		response.SpanishText = spanishText
	} else if qeqchiText != "" { // Si se proporciona texto en Q'eqchi', traducir a Español
		err = db.QueryRow("SELECT palabra_esp, audio_esp, audio_qeqchi FROM traducciones WHERE palabra_qeqchi = ?", qeqchiText).Scan(&response.SpanishText, &response.AudioES, &response.AudioQeq)
		response.QeqchiText = qeqchiText
	}

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "No se encontró una traducción para el texto proporcionado", http.StatusNotFound)
		} else {
			http.Error(w, "Error al consultar la base de datos", http.StatusInternalServerError)
			log.Println("Error al consultar la base de datos:", err)
		}
		return
	}

	// Enviar la traducción como respuesta
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Error al codificar la respuesta JSON", http.StatusInternalServerError)
		log.Println("Error al codificar la respuesta JSON:", err)
		return
	}
})
