export default interface RandomProvider {
  getRandomIntegerInRange(min: number, max: number): number;
}