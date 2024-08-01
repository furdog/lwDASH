import http.server
import socketserver

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Замість "index.html" вказуємо конкретний файл, який потрібно віддавати
        if self.path == '/':
            self.path = 'interface.built.html'
        return super().do_GET()

# Вкажіть порт, на якому буде працювати сервер
PORT = 8000

# Створюємо обробник запитів
Handler = CustomHTTPRequestHandler

# Запускаємо сервер
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
