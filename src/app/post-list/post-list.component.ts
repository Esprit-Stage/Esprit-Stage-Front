import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = []; // Liste des posts
  filteredPosts: Post[] = []; // Liste filtrée des posts
  searchQuery: string = ''; // Terme de recherche

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPosts(); // Charger les posts au démarrage
  }

  // Charger tous les posts
  loadPosts(): void {
    this.postService.getAcceptedPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        this.filteredPosts = data; // Initialiser la liste filtrée avec tous les posts
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des posts', error);
      }
    });
  }

  // Recherche par contenu ou titre
  searchPosts(): void {
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      this.filteredPosts = this.posts.filter(post =>
        post.content.toLowerCase().includes(query) ||
        (post.titre && post.titre.toLowerCase().includes(query)) // Ajout de la recherche par titre
      );
    } else {
      this.filteredPosts = this.posts;
    }
  }

  // Supprimer un post
  deletePost(postId: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce post ?')) {
      this.postService.deletePost(postId).subscribe(
        () => {
          console.log('Post supprimé avec succès');
          this.posts = this.posts.filter(post => post.id !== postId);
          this.filteredPosts = this.posts;
        },
        (error) => {
          console.error('Erreur lors de la suppression du post', error);
        }
      );
    }
  }

  // Détails d'un post
  viewDetails(postId: string): void {
    this.router.navigate(['/posts', postId]);
  }

  updatePostRating(postId: string, newRating: number): void {
    this.postService.updateRating(postId, newRating).subscribe(
      (updatedPost) => {
        console.log(`Rating mis à jour pour le post ${postId} :`, updatedPost.rating);
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          post.rating = newRating;
        }
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du rating', error);
      }
    );
  }

  likePost(id: string): void {
    this.postService.likePost(id).subscribe(() => {
      this.loadPosts();
    });
  }

  dislikePost(id: string): void {
    this.postService.dislikePost(id).subscribe(() => {
      this.loadPosts();
    });
  }

  expandedPosts: string[] = [];

  toggleExpand(postId: string): void {
    const index = this.expandedPosts.indexOf(postId);
    if (index > -1) {
      this.expandedPosts.splice(index, 1); // collapse
    } else {
      this.expandedPosts.push(postId); // expand
    }
  }
  
  isExpanded(postId: string): boolean {
    return this.expandedPosts.includes(postId);
  }
  

}
