const navItems = [
    {
        link: './direct-link.html',
        html: 'Direct Link'
    },
    {
        link: null,
        html: 'Single Menu',
        child: [
            {
                html: 'First',
                link: null,
            },
            {
                html: 'Second',
                link: null,
            },
            {
                html: 'Third',
                link: null,
            },
            {
                html: 'Fourth',
                link: null,
            },
        ]
    },
    {
        link: null,
        html: 'Configure',
        child: [
            {
                html: 'Themes',
                link: null,
                child: [
                    {
                        id: 1,
                        html: 'Red',
                        link: null,
                        onClick: changeColor
                    },
                    {
                        id: 2,
                        html: 'Blue',
                        link: null,
                        onClick: changeColor
                    },
                    {
                        id: 3,
                        html: 'Green',
                        link: null,
                        onClick: changeColor
                    },
                ]
            },
            {
                html: 'Font Size',
                link: null,
                child: [
                    {
                        id: 4,
                        html: 'A<sup>-</sup>',
                        link: null,
                        onClick: changeFont
                    },
                    {
                        id: 5,
                        html: 'A',
                        link: null,
                        onClick: changeFont
                    },
                    {
                        id: 6,
                        html: 'A<sup>+</sup>',
                        link: null,
                        onClick: changeFont
                    },
                ]
            },
            {
                html: 'Font Family',
                link: null,
                child: [
                    {
                        id: 7,
                        html: 'Poppins',
                        link: null,
                        onClick: changeFamily
                    },
                    {
                        id: 8,
                        html: 'Roboto',
                        link: null,
                        onClick: changeFamily
                    }
                ]
            },
        ]
    }
];

const navItemsContainerRef = document.querySelector('.nav-items-container');
const backStepIconRef = document.querySelector('.back-step');
let currentBackStep = 0;

navItems.forEach((item) => {
    // create a nav item div
    const navItemRef = document.createElement('div');
    navItemRef.classList.add('nav-item');

    // div to show link text
    const div = document.createElement('div');
    div.innerHTML = item.html;
    navItemRef.appendChild(div);

    if (item.child?.length) {
        // SUb Nav handling in smaller screens <= 768
        navItemRef.addEventListener('click', (ev) => {
            if (window.innerWidth <= 768) {
                const DOM = ev.target.matches('.sub-nav') ? ev.target.querySelector('.sub-nav') : ev.target.parentElement.querySelector('.sub-nav');
                if (DOM) {
                    DOM.classList.add('menu-in');
                    backStepIconRef.classList.add('show');
                    currentBackStep = 1;
                }
            }
        })

        // down arrow
        const img = document.createElement('img');
        img.setAttribute('src', 'assets/down-arrow.svg');

        // SUB NAV
        const subNavRef = document.createElement('div');
        subNavRef.classList.add('sub-nav');

        let isFirstItemHasChild = true;

        item.child.forEach((childItem) => {
            // SUB Item
            const subItemRef = document.createElement('div');
            subItemRef.classList.add('sub-item');

            // div to show link text
            const subItemLinkdiv = document.createElement('div');
            subItemLinkdiv.innerHTML = childItem.html;
            subItemRef.appendChild(subItemLinkdiv);

            if (childItem.child?.length) {
                // Nav Options handling in smaller screens <= 768
                subItemRef.addEventListener('click', (ev) => {
                    const DOM = ev.target.matches('.sub-nav-options') ? ev.target.querySelector('.sub-nav-options') : ev.target.parentElement.querySelector('.sub-nav-options');
                    if (window.innerWidth <= 768) {
                        DOM.classList.add('menu-in');
                        currentBackStep = 2;
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                })

                // down arrow
                const img = document.createElement('img');
                img.setAttribute('src', 'assets/down-arrow.svg');

                // SUB NAV OPTIONS
                const subNavOptionsRef = document.createElement('div');
                subNavOptionsRef.classList.add('sub-nav-options');

                childItem.child.forEach((obj) => {
                    // nav-option div
                    const navOptionRef = document.createElement('div');
                    navOptionRef.classList.add('nav-option');
                    navOptionRef.innerHTML = obj.html;
                    if (obj.onClick) {
                        navOptionRef.id = obj.id;
                        navOptionRef.onclick = () => obj.onClick(obj);
                    }
                    subNavOptionsRef.appendChild(navOptionRef);
                })

                if (isFirstItemHasChild) {
                    subItemRef.classList.add('active');
                    isFirstItemHasChild = false;
                }

                subItemRef.appendChild(img);
                subItemRef.appendChild(subNavOptionsRef);
            }

            subNavRef.appendChild(subItemRef);
        })

        navItemRef.appendChild(img);
        navItemRef.appendChild(subNavRef);
    }

    navItemsContainerRef.appendChild(navItemRef);


})

function displayNavItems(ele) {
    navItemsContainerRef.classList.toggle('m-display-nav');
    ele.classList.toggle('active');
}

backStepIconRef.addEventListener('click', (ev) => {
    if (currentBackStep == 1) {
        document.querySelector('.sub-nav.menu-in').classList.remove('menu-in');
        backStepIconRef.classList.remove('show');
        currentBackStep--;
    }

    if (currentBackStep == 2) {
        document.querySelector('.sub-nav-options.menu-in').classList.remove('menu-in');
        currentBackStep--;
    }
})

function changeColor(obj) {
    let color = 'black';
    if (obj.id === 1) {
        color = 'red'
    }
    if (obj.id === 2) {
        color = 'blue'
    }
    if (obj.id === 3) {
        color = 'green'
    }
    document.querySelector(':root').style.setProperty('--primary', color);
}

function changeFont(obj) {
    let size = getComputedStyle(document.querySelector(':root')).getPropertyValue('--font-size');;
    if (obj.id === 4 && parseInt(size) > 12) {
        size = (parseInt(size) - 2) + 'px';
    }
    if (obj.id === 5) {
        size = '16px';
    }
    if (obj.id === 6 && parseInt(size) < 20) {
        size = (parseInt(size) + 2) + 'px';
    }
    document.querySelector(':root').style.setProperty('--font-size', size);
}

function changeFamily(obj) {
    family = 'sans-serif'
    if (obj.id === 7) {
        family = 'Poppins'
    }
    if (obj.id === 8) {
        family = 'Roboto'
    }
    document.querySelector(':root').style.setProperty('--font-family', family);
}