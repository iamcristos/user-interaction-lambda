export default {
  type: "object",
  properties: {
    eventType: { type: 'string' },
    eventSource: { type: 'string' },
    userId: { type: 'string'}
  },
  required: ['eventType', 'eventSource', 'userId']
} as const;
