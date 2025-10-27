document.getElementById('importBtn').addEventListener('click', () => {
        document.getElementById('fileInput').click();
      });
    
      document.getElementById('fileInput').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = function(e) {
          try {
            const importedData = JSON.parse(e.target.result);
            // On suppose que importedData est un objet avec les clés project_*
            for (const key in importedData) {
              if (importedData.hasOwnProperty(key)) {
                // Sauvegarde dans localStorage
                localStorage.setItem(key, JSON.stringify(importedData[key]));
              }
            }
            alert('Importation réussie !');
            // Optionnel : recharger la page ou mettre à jour l'interface
          } catch (error) {
            alert('Erreur lors de la lecture du fichier : ' + error.message);
          }
        };
        reader.readAsText(file);
    
        // Reset input pour pouvoir importer plusieurs fois le même fichier
        event.target.value = '';
      });
    // Génération des étoiles
    function createStars() {
        const starsContainer = document.getElementById('stars');
        const numStars = 100;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }

    document.getElementById('exportAllBtn').addEventListener('click', () => {
  // On récupère toutes les clés dans localStorage
  const allKeys = Object.keys(localStorage);

  // On filtre les clés qui commencent par "project_"
  const projectKeys = allKeys.filter(key => key.startsWith('project_'));

  if (projectKeys.length === 0) {
    alert("Aucune donnée de projet trouvée dans le localStorage.");
    return;
  }

  // On construit un objet avec uniquement ces clés et leurs données parsées
  const projectsData = {};
  projectKeys.forEach(key => {
    try {
      projectsData[key] = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.warn(`Erreur lors du parsing JSON de la clé ${key}`, e);
      // Optionnel : on peut stocker la donnée brute ou la sauter
      projectsData[key] = localStorage.getItem(key);
    }
  });

  // On convertit en string JSON joliment formaté
  const jsonStr = JSON.stringify(projectsData, null, 2);

  // Création du blob et téléchargement
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'projects_export.json'; // nom du fichier à télécharger
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});



    function saveChecklist(projectId, data) {
        const projects = JSON.parse(localStorage.getItem("projects") || "[]");
        const projectIndex = projects.findIndex(p => p.id === projectId);
        if (projectIndex !== -1) {
            projects[projectIndex].checklist = data;
            localStorage.setItem("projects", JSON.stringify(projects));
        }
    }


        // Gestion des catégories
        function initializeCategories() {
            const categoryBtns = document.querySelectorAll('.category-btn');
            const projectCards = document.querySelectorAll('.project-card');

            categoryBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Retirer la classe active de tous les boutons
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    // Ajouter la classe active au bouton cliqué
                    btn.classList.add('active');

                    const category = btn.dataset.category;
                    
                    projectCards.forEach(card => {
                        if (category === 'all' || card.dataset.category === category) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeInUp 0.5s ease-out';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }

        // Recherche
        function initializeSearch() {
            const searchInput = document.getElementById('searchInput');
            const projectCards = document.querySelectorAll('.project-card');

            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                projectCards.forEach(card => {
                    const title = card.querySelector('.project-title').textContent.toLowerCase();
                    const description = card.querySelector('.project-description').textContent.toLowerCase();
                    const type = card.querySelector('.project-type').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm) || type.includes(searchTerm)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }

        // Gestion des clics sur les cartes
        function initializeCardClicks() {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.addEventListener('click', () => {
                    const projectId = card.dataset.id;
                    if (projectId) {
                        window.location.href = `project-details.html?id=${projectId}`;
                    }
                });
            });
        }

        // Comptage des projets
        function updateStats() {
            const projectCards = document.querySelectorAll('.project-card');
            const onlineProjects = document.querySelectorAll('[data-category="online"]').length;
            const localProjects = document.querySelectorAll('[data-category="local"]').length;
            
            // Animation des chiffres
            function animateNumber(element, target) {
                let current = 0;
                const increment = target / 20;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    element.textContent = Math.floor(current);
                }, 50);
            }
            
            setTimeout(() => {
                animateNumber(document.getElementById('totalProjects'), projectCards.length);
                animateNumber(document.getElementById('onlineProjects'), onlineProjects);
                animateNumber(document.getElementById('localProjects'), localProjects);
            }, 2000);
        }

        // Initialisation des projets
        function initializeProjects() {
            // Vérifier si les projets existent déjà
            const projects = JSON.parse(localStorage.getItem('projects') || '[]');
            
            if (projects.length === 0) {
                // Créer des projets exemples si aucun projet n'existe
                const exampleProjects = [
                    {
                        id: '1',
                        name: 'Site Portfolio',
                        description: 'Mon site portfolio personnel avec toutes mes réalisations et compétences.',
                        type: 'React',
                        status: 'online',
                        url: 'https://example.com',
                        notes: "# Site Portfolio\n\n## Objectifs\n- [ ] Optimiser les performances\n- [ ] Ajouter de nouvelles fonctionnalités\n- [ ] Améliorer le SEO\n\n## Planification\n- [ ] Phase 1 : Design\n- [ ] Phase 2 : Développement\n- [ ] Phase 3 : Optimisation\n\n## Tâches\n- [ ] Mise à jour du design\n- [ ] Ajout de nouvelles fonctionnalités\n- [ ] Optimisation des images\n\n## Points à surveiller\n- [ ] Temps de chargement\n- [ ] Compatibilité navigateurs\n- [ ] SEO\n\n## Notes diverses\n\n",
                        checklist: {
                            'Objectifs': [
                                { text: 'Mise à jour du design', completed: false },
                                { text: 'Ajout de nouvelles fonctionnalités', completed: false },
                                { text: 'Optimisation des images', completed: false }
                            ],
                            'Points à surveiller': [
                                { text: 'Temps de chargement', completed: false },
                                { text: 'Compatibilité navigateurs', completed: false },
                                { text: 'SEO', completed: false }
                            ]
                        }
                    },
                    {
                        id: '2',
                        name: 'Application Todo',
                        description: 'Une application de gestion de tâches avec interface moderne et fonctionnalités avancées.',
                        type: 'Vanilla JS',
                        status: 'local',
                        url: 'file:///C:/Users/YourName/Projects/app/index.html',
                        notes: "# Application Todo\n\n## Objectifs\n- [ ] Ajouter la fonctionnalité de partage\n- [ ] Améliorer l'interface utilisateur\n- [ ] Ajouter des statistiques\n\n## Planification\n- [ ] Phase 1 : Architecture\n- [ ] Phase 2 : Frontend\n- [ ] Phase 3 : Backend\n\n## Tâches\n- [ ] Implémenter le partage\n- [ ] Redesign de l'interface\n- [ ] Ajout des statistiques\n\n## Points à surveiller\n- [ ] Performance\n- [ ] UX\n- [ ] Sécurité\n\n## Notes diverses\n\n",
                        checklist: {
                            'Développement': [
                                { text: 'Implémenter le partage', completed: false },
                                { text: 'Redesign de l\'interface', completed: false },
                                { text: 'Ajout des statistiques', completed: false }
                            ],
                            'Tests': [
                                { text: 'Tester le partage', completed: false },
                                { text: 'Tester l\'interface', completed: false },
                                { text: 'Tester les statistiques', completed: false }
                            ]
                        }
                    }
                ];
                
                // Sauvegarder les projets
                localStorage.setItem('projects', JSON.stringify(exampleProjects));
                console.log('Projets créés avec succès');
            } else {
                // Vérifier et corriger les données existantes
                projects.forEach(project => {
                    if (!project.checklist) {
                        project.checklist = {};
                    }
                });
                localStorage.setItem('projects', JSON.stringify(projects));
                console.log('Projets déjà existants dans localStorage');
            }
        }

        // Initialisation
        document.addEventListener('DOMContentLoaded', () => {
            createStars();
            initializeCategories();
            initializeSearch();
            initializeCardClicks();
            updateStats();
            initializeProjects();
            
            // Vérification des données de projet
            const projects = JSON.parse(localStorage.getItem('projects') || '[]');
            if (projects.length === 0) {
                console.error('Aucun projet trouvé dans localStorage');
            } else {
                console.log('Projets trouvés:', projects);
            }
        });