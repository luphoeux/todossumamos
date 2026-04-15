@echo off
echo ========================================================
echo Iniciando servidor de desarrollo para: Todos Somos - Qhantuy
echo ========================================================
echo.
echo La pagina web se abrira automaticamente en tu navegador.
echo (Para detener el servidor, cierra esta ventana negra)
echo.

:: Abrimos el navegador apuntando a un puerto distinto (8055) para evitar conflictos con otros de tus proyectos
start http://localhost:8055

:: Iniciamos el servidor de PHP en ese directorio
php -S localhost:8055
