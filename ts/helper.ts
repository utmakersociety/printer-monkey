export class Helper {
  public static formatFileSize(bytes: any) : string {
    // using the inputed bytes find out what unit to use and store this for later
    const exp = Math.log(bytes) / Math.log(1024) | 0;
    // simplify bytes into proper unit numbers
    const result = (bytes / Math.pow(1024, exp)).toFixed(2);
    // using exp format the unit from a string
    const unit = exp === 0 ? 'bytes': 'KMGTPEZY'[exp - 1] + 'B';
    return `${result} ${unit}` ;
  }
}