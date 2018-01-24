export class Helper {
  public static formatFileSize(bytes: any) {
    const exp = Math.log(bytes) / Math.log(1024) | 0;
    const result = (bytes / Math.pow(1024, exp)).toFixed(2);
    const unit = exp == 0 ? 'bytes': 'KMGTPEZY'[exp - 1] + 'B';
    return `${result} ${unit}` ;
  }
}