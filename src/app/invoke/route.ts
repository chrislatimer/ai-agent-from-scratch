import { invokeAgent } from '../_actions/actions';

export async function GET() {
  const data = { status: 'ok' };

  await invokeAgent(
    `I'm getting an error when trying to use the Vectorize experiments saying that the max file size if 5MB. Can you help me with that?`
  );
  //await invokeAgent(`What embedding models does Vectorize support?`);
  return Response.json({ data });
}
