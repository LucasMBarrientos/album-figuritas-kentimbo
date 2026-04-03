#!/usr/bin/env python3
import http.server
import socketserver
import os

PORT = 8000
DIRECTORY = r"c:\Users\Lucas\OneDrive\Escritorio\album figuritas kentimbo"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

try:
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print("=" * 50)
        print("  SERVIDOR DE ÁLBUM DE FIGURITAS")
        print("=" * 50)
        print(f"\n✅ Servidor activo en: http://localhost:{PORT}")
        print(f"📂 Sirviendo archivos desde: {DIRECTORY}\n")
        print("Presiona CTRL+C para detener el servidor\n")
        httpd.serve_forever()
except Exception as e:
    print(f"Error: {e}")
