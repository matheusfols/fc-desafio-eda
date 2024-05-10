// tests/kafkaConsumer.test.ts

import kafkaConnection from '../../config/kafka.config';
import KafkaConsumer from './kafka.consumer';

jest.mock('../../config/kafka.config');

describe('KafkaConsumer', () => {
  let mockConsumer: any;
  let messageHandler: any;

  beforeEach(() => {
    // Inicializa o handler de mensagens como um mock function
    messageHandler = jest.fn();

    // Configura o mock do consumidor
    mockConsumer = {
      connect: jest.fn().mockResolvedValue(void 0),
      subscribe: jest.fn().mockResolvedValue(void 0),
      run: jest.fn().mockImplementation(({ eachMessage }) => {
        eachMessage({ message: { value: Buffer.from('test message') } });
      })
    };

    // Substitui a função consumer para retornar o mockConsumer
    kafkaConnection.consumer = jest.fn().mockReturnValue(mockConsumer);
  });

  afterEach(() => {
    // Limpa todos os mocks após cada teste
    jest.clearAllMocks();
  });

  it('should connect and subscribe to the specified topic', async () => {
    const topic = 'test-topic';

    await KafkaConsumer(topic, messageHandler, true);

    expect(mockConsumer.connect).toHaveBeenCalled();
    expect(mockConsumer.subscribe).toHaveBeenCalledWith({
      topic,
      fromBeginning: true
    });
  });

  it('should handle messages using the provided message handler', async () => {
    const topic = 'test-topic';

    await KafkaConsumer(topic, messageHandler, true);

    expect(messageHandler).toHaveBeenCalledWith({
      message: { value: Buffer.from('test message') }
    });
  });

  it('should handle errors correctly', async () => {
    const topic = 'test-topic';
    const error = new Error('Kafka error');
    mockConsumer.run.mockRejectedValueOnce(error);

    await expect(KafkaConsumer(topic, messageHandler, true)).rejects.toThrow('Kafka Consumer: Error: Kafka error');
  });
});
