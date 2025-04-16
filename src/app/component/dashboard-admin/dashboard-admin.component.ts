import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  expandedPostId: string | null = null;
  currentFilter: 'all' | 'accepted' | 'refused' | 'pending' = 'all';

  // Chart configuration
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Posts'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Likes'
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        callbacks: {
          afterLabel: (context) => {
            const post = this.posts.find(p => 
              p.titre.substring(0, 20) === context.label);
            return post ? `Total likes: ${post.likeCount}\nDislikes: ${post.dislikeCount}` : '';
          }
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Likes',
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1
      },
      {
        data: [],
        label: 'Dislikes',
        backgroundColor: '#F44336',
        borderColor: '#D32F2F',
        borderWidth: 1
      }
    ]
  };

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPosts('all');
  }

  loadPosts(filter: 'all' | 'accepted' | 'refused' | 'pending'): void {
    this.currentFilter = filter;
    
    switch(filter) {
      case 'all':
        this.postService.getPosts().subscribe({
          next: (data: Post[]) => {
            this.posts = data;
            this.filteredPosts = data;
            this.prepareChartData(data);
          },
          error: (err) => {
            console.error('Error loading posts:', err);
          }
        });
        break;
      case 'accepted':
        this.postService.getAcceptedPosts().subscribe({
          next: (data: Post[]) => {
            this.posts = data;
            this.filteredPosts = data;
            this.prepareChartData(data);
          }
        });
        break;
      case 'refused':
        this.postService.getRefusedPosts().subscribe({
          next: (data: Post[]) => {
            this.posts = data;
            this.filteredPosts = data;
            this.prepareChartData(data);
          }
        });
        break;
      case 'pending':
        this.postService.getPendingPosts().subscribe({
          next: (data: Post[]) => {
            this.posts = data;
            this.filteredPosts = data;
            this.prepareChartData(data);
          }
        });
        break;
    }
  }

  prepareChartData(posts: Post[]): void {
    const sortedPosts = [...posts].sort((a, b) => b.likeCount - a.likeCount);
    const topPosts = sortedPosts.slice(0, 5);
    
    this.barChartData.labels = topPosts.map(post => 
      post.titre.length > 20 ? post.titre.substring(0, 20) + '...' : post.titre
    );
    
    this.barChartData.datasets[0].data = topPosts.map(post => post.likeCount);
    this.barChartData.datasets[1].data = topPosts.map(post => post.dislikeCount);
  }
// Add these methods to your component class
isPending(post: Post): boolean {
  return post.isApproved === null;
}

isAccepted(post: Post): boolean {
  return post.isApproved === true;
}

isRefused(post: Post): boolean {
  return post.isApproved === false;
}
  acceptPost(postId: string): void {
    this.postService.acceptPost(postId).subscribe({
      next: () => {
        this.loadPosts(this.currentFilter);
      },
      error: (error) => {
        console.error('Error accepting post:', error);
      }
    });
  }

  refusePost(postId: string): void {
    this.postService.refusePost(postId).subscribe({
      next: () => {
        this.loadPosts(this.currentFilter);
      },
      error: (error) => {
        console.error('Error refusing post:', error);
      }
    });
  }

  editPost(postId: string): void {
    this.router.navigate([`/edit/${postId}`]);
  }

  deletePost(postId: string): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe({
        next: () => {
          this.loadPosts(this.currentFilter);
        },
        error: (error) => {
          console.error('Error deleting post:', error);
        }
      });
    }
  }

  getTotalLikes(): number {
    return this.posts.reduce((sum, post) => sum + post.likeCount, 0);
  }

  getTotalDislikes(): number {
    return this.posts.reduce((sum, post) => sum + post.dislikeCount, 0);
  }

  toggleContent(postId: string): void {
    this.expandedPostId = this.expandedPostId === postId ? null : postId;
  }
}
