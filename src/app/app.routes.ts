import { Routes } from '@angular/router';
import { ChatAnalysisComponent } from './pages/chat-analysis/chat-analysis.component';

export const routes: Routes = [
  { path: 'dashboard', component: ChatAnalysisComponent },
  // Add any other routes as needed
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
