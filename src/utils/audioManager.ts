import fs from 'fs';
import path from 'path';

export class AudioManager {
  private static audioDir = path.join(__dirname, '../assets/audio');

  public static ensureAudioDirectory(): void {
    if (!fs.existsSync(this.audioDir)) {
      fs.mkdirSync(this.audioDir, { recursive: true });
    }
  }

  public static getAvailableSongs(): string[] {
    try {
      this.ensureAudioDirectory();
      const files = fs.readdirSync(this.audioDir);
      return files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return ['.mp3', '.wav', '.ogg'].includes(ext);
      });
    } catch (error) {
      console.error('Error al leer el directorio de audio:', error);
      return [];
    }
  }

  public static songExists(songName: string): boolean {
    this.ensureAudioDirectory();
    const songs = this.getAvailableSongs();
    return songs.includes(songName);
  }
}
