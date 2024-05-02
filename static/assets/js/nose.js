async function enviarScript() {
    const message = "teamo";

    const main = document.querySelector("#main");
    const textarea = main.querySelector(`div[contenteditable="true"]`);

    if (!textarea) {
        throw new Error("Não há uma conversa aberta");
    }

    for (let i = 0; i < 100; i++) {
        textarea.focus();
        document.execCommand('insertText', false, message);
        textarea.dispatchEvent(new Event('change', { bubbles: true }));

        await new Promise(resolve => setTimeout(resolve, 100));

        const sendButton = main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`);
        sendButton.click();

        if (i !== 99) {
            await new Promise(resolve => setTimeout(resolve, 250));
        }
    }

    return 100; // Retorna o número de mensagens enviadas
}

enviarScript()
    .then(e => console.log(`Código finalizado, ${e} mensagens enviadas`))
    .catch(console.error);
