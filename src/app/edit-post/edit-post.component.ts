// edit-post.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { Location } from '@angular/common'; // Importer Location pour revenir en arrière

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  postForm: FormGroup;
  post: Post | undefined;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location // Injecter le service Location
  ) {
    this.postForm = this.fb.group({
      titre: ['', Validators.required],  // <= Ajout ici
      content: ['', Validators.required],
      imageUrl: [''],
      link: [''],
      isApproved: [false]
    });
  }

  ngOnInit(): void {
    // Récupérer l'id du post via les paramètres de la route
    const postId = this.route.snapshot.paramMap.get('id');
    
    if (postId) {
      this.postService.getPostById(postId).subscribe((data: Post) => {
        this.post = data;
        // Pré-remplir le formulaire avec les données du post
        this.postForm.patchValue({
          titre: this.post.titre,
          content: this.post.content,
          imageUrl: this.post.imageUrl,
          link: this.post.link,
          isApproved: this.post.isApproved
        });
      });
    }
  }

  updatePost(): void {
    if (this.postForm.valid && this.post) {
      const updatedPost = { ...this.post, ...this.postForm.value };
      console.log('Post mis à jour :', updatedPost); // Vérifie ici
      this.postService.updatePost(updatedPost).subscribe(
        () => {
          console.log('Post mis à jour avec succès');
          this.location.back(); 
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du post', error);
        }
      );
    }
  }
  
}
