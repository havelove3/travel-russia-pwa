document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const routeCards = document.querySelectorAll('.route-card');
    
    // Фильтрация маршрутов
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            // Фильтруем карточки
            routeCards.forEach(card => {
                const cardCategories = card.dataset.category.split(' ');
                const shouldShow = filterValue === 'all' || 
                                 cardCategories.includes(filterValue);
                
                card.style.display = shouldShow ? 'block' : 'none';
            });
        });
    });
    
    // Анимация при наведении
    routeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});