import { Injectable } from '@angular/core';
import { functions } from './firebase-helpers';
@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  async getReadMe(): Promise<string> {
    const getReadMe = functions().httpsCallable('gitHub-getReadMe');
    const result = await getReadMe('');
    return result.data;
  }

  async saveReadMe(content: string): Promise<void> {
    const saveReadMe = functions().httpsCallable('gitHub-saveReadMe');
    await saveReadMe(content);
  }
}
