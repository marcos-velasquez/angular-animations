import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimateClickDirective } from 'ngx-gsap';
import { animations, Animation } from './data/animations.data';

@Component({
  imports: [CommonModule, FormsModule, RouterModule, AnimateClickDirective],
  selector: 'animate-root',
  templateUrl: './app.html',
})
export class App {
  protected title = 'ngx-gsap';
  protected animations = animations;

  // Filters
  protected searchQuery = signal('');
  protected selectedCategory = signal<'all' | Animation['category']>('all');
  protected activeTab = signal<'animations' | 'docs'>('animations');

  // Computed filtered animations
  protected filteredAnimations = computed(() => {
    let filtered = this.animations;

    // Filter by category
    if (this.selectedCategory() !== 'all') {
      filtered = filtered.filter((anim) => anim.category === this.selectedCategory());
    }

    // Filter by search query
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      filtered = filtered.filter(
        (anim) =>
          anim.name.toLowerCase().includes(query) ||
          anim.description.toLowerCase().includes(query) ||
          anim.value.toLowerCase().includes(query)
      );
    }

    return filtered;
  });

  // Category counts
  protected categoryCounts = computed(() => ({
    all: this.animations.length,
    entrance: this.animations.filter((a) => a.category === 'entrance').length,
    exit: this.animations.filter((a) => a.category === 'exit').length,
    attention: this.animations.filter((a) => a.category === 'attention').length,
    special: this.animations.filter((a) => a.category === 'special').length,
  }));

  protected setCategory(category: 'all' | Animation['category']) {
    this.selectedCategory.set(category);
  }

  protected setTab(tab: 'animations' | 'docs') {
    this.activeTab.set(tab);
  }
}
