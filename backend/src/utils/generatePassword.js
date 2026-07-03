import generator from 'generate-password';

export function createPassword() {
  return generator.generate({
    length: 10,
    numbers: true,
  });
}