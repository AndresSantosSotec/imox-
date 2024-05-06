async function enviarScript() {
    const messages = ["Te Amo🥺❤️"]; // Mensajes y emojis a enviar
    let index = 0; // Índice para alternar entre mensajes y emojis

    const main = document.querySelector("#main");
    const textarea = main.querySelector(`div[contenteditable="true"]`);

    if (!textarea) {
        throw new Error("No hay una conversación abierta");
    }

    for (let i = 0; i < 500; i++) { // Cambiado a 500 mensajes
        textarea.focus();
        document.execCommand('insertText', false, messages[index]);
        textarea.dispatchEvent(new Event('change', { bubbles: true }));

        await new Promise(resolve => setTimeout(resolve, 1000));

        const sendButton = main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`);
        sendButton.click();

        if (i !== 499) { // Cambiado a 499 para que el último mensaje no tenga un retraso adicional
            await new Promise(resolve => setTimeout(resolve, 250));
        }

        // Cambiar al siguiente mensaje o emoji
        index = (index + 1) % messages.length;
    }

    return 500; // Retorna el número de mensajes enviados
}

enviarScript()
    .then(e => console.log(`Código finalizado, ${e} mensajes enviados`))
    .catch(console.error);
