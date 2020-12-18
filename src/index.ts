export default async function listen(): Promise<void> {
  console.log('Listening');
  await new Promise((r) => setTimeout(r, 5000));

  return listen();
}

listen();
