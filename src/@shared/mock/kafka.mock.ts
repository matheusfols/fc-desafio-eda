jest.mock('../../../@shared/kafka/kafka.producer', () => {
  return jest.fn();
});

const mockKafkaProducer = require('../kafka/kafka.producer');

export { mockKafkaProducer }