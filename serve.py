#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
import os

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

os.chdir(DIRECTORY)

Handler = http.server.SimpleHTTPRequestHandler

print(f"🚀 Iniciando servidor en http://localhost:{PORT}")
print("📁 Sirviendo archivos desde:", DIRECTORY)
print("🛑 Presiona Ctrl+C para detener el servidor\n")

# Abrir navegador automáticamente
webbrowser.open(f'http://localhost:{PORT}')

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n✅ Servidor detenido")
        pass