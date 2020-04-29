import { Injectable } from '@angular/core';
import { functions } from './firebase-helpers';
@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  async getContent(path: string): Promise<string> {
    const getContent = functions().httpsCallable('gitHub-getContent');
    const result = await getContent({ path });
    return result.data;
  }

  async saveContent(path: string, content: string): Promise<void> {
    const saveContent = functions().httpsCallable('gitHub-saveContent');
    await saveContent({ path, content });
  }
}
