document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.formDenuncia').forEach(form => {

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const tipo = form.querySelector('[name="tipo"]').value;
      const elemento_id = form.querySelector('[name="elemento_id"]').value;
      const motivo_id = form.querySelector('[name="motivo_id"]').value;
      const descripcion = form.querySelector('[name="descripcion"]').value;

      try {
        const respuesta = await fetch('/denuncias/crear', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tipo, elemento_id, motivo_id, descripcion })
        });

        const resultado = await respuesta.json();

        const contenedor = form.closest('.collapse');
        const mensaje = contenedor.querySelector('.mensajeDenuncia');

        if (resultado.ok) {
          mensaje.className = 'mensajeDenuncia alert alert-success mt-2';
          mensaje.textContent = resultado.tipo === 'imagen'
            ? '✅ Imagen denunciada correctamente.'
            : '✅ Comentario denunciado correctamente.';
          form.style.display = 'none';

        } else if (resultado.error === 'ya_denunciaste') {
          mensaje.className = 'mensajeDenuncia alert alert-warning mt-2';
          mensaje.textContent = resultado.tipo === 'imagen'
            ? '⚠️ Ya denunciaste esta imagen.'
            : '⚠️ Ya denunciaste este comentario.';
        }

      } catch (error) {
        console.error('Error al denunciar:', error);
      }
    });
  });
});