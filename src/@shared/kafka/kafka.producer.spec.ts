import KafkaProducer from './kafka.producer'; // ajuste o caminho conforme necessário
import kafkaConnection from '../../config/kafka.config';
jest.mock('../../config/kafka.config');

const mockConnect = jest.fn();
const mockDisconnect = jest.fn();
const mockSend = jest.fn();

kafkaConnection.producer = jest.fn().mockImplementation(() => ({
  connect: mockConnect,
  send: mockSend,
  disconnect: mockDisconnect,
}));

describe('KafkaProducer', () => {
  beforeEach(() => {
    mockConnect.mockClear();
    mockDisconnect.mockClear();
    mockSend.mockClear();
  });

  it('should connect, send a message, and disconnect', async () => {
    const topic = 'test-topic';
    const message = { value: 'Test message' };

    await KafkaProducer(topic, message);

    expect(mockConnect).toHaveBeenCalled();
    expect(mockSend).toHaveBeenCalledWith({
      topic,
      messages: [message],
    });
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('should throw an error if sending fails', async () => {
    const error = new Error('Failed to send');
    mockSend.mockRejectedValueOnce(error);

    await expect(KafkaProducer('test-topic', { value: 'Test message' }))
      .rejects.toThrow(`Kafka Producer: ${error}`);
  });
});
