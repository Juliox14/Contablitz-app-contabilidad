import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Verificar si existe la cookie de la empresa seleccionada
  const empresaSeleccionada = request.cookies.has('empresaSeleccionada');

  // Si no hay empresa seleccionada (cookie no existe), redirigir a '/nuevaEmpresa'
  if (!empresaSeleccionada) {
    return NextResponse.redirect(new URL('/nuevaEmpresa', request.url));
  }

  // Si hay empresa seleccionada, continuar con la petición
  return NextResponse.next();
}

// Configuración para aplicar el middleware solo en la ruta raíz ("/")
export const config = {
  matcher: ['/'],  // Solo se aplica a la ruta raíz
}
