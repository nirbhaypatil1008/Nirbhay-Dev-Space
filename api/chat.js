import { handleChatRequest } from '../server/chatService.js';

export default async function handler(req, res) {
  return handleChatRequest(req, res);
}