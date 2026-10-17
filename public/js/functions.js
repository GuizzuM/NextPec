
function toggleMenu() {
    const sidebar = document.getElementById('mySidebar');
    const overlay = document.getElementById('overlay');
    const btn     = document.getElementById('btn-menu-toggle');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    btn.innerHTML = sidebar.classList.contains('active') ? '✕' : '☰';
}

function openModal()  { 
    document.getElementById('formModal').classList.add('active'); 
}

function closeModal() { 
    document.getElementById('formModal').classList.remove('active'); 
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('overlay').onclick = function() {
        toggleMenu();
    };

    window.onclick = function(event) {
        const modal = document.getElementById('formModal');
        if (modal && event.target == modal) closeModal();
    };

});