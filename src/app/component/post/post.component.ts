import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postForm: FormGroup;
  showForm: boolean = false;

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialisation du formulaire avec validation
    this.postForm = this.fb.group({
      titre: ['', Validators.required],       // Titre obligatoire
      content: ['', Validators.required],     // Contenu obligatoire
      imageUrl: [''],                         // URL d’image optionnelle
      link: [''],                             // Lien externe optionnel
      isApproved: [false]                     // Par défaut, non approuvé
    });
  }

  ngOnInit(): void {}

  // Affiche ou masque le formulaire
  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  // Envoie du post au backend
  addPost(): void {
    if (this.postForm.valid) {
      const newPost: Post = {
        ...this.postForm.value,
        timestamp: new Date(), // Date actuelle
        likeCount: 0,
        dislikeCount: 0
      };

      this.postService.createPost(newPost).subscribe(
        () => {
          console.log('Post ajouté avec succès');
          this.postForm.reset();      // Réinitialise le formulaire
          this.showForm = false;      // Masque le formulaire
        },
        (error) => {
          console.error("Erreur lors de l'ajout du post", error);
        }
      );
    }
  }
}
