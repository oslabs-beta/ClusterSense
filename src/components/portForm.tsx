import { useState, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

interface PortFormProps {
  port: string;
  setPort: (port: string) => void;
  onSubmit: (port: string) => Promise<boolean>; // returns true on success
}

const PortForm = ({ port, setPort, onSubmit }: PortFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const success = await onSubmit(port);
    if (!success) setError('Failed to save cluster. Please try again.');
    setIsLoading(false);
  };

  return (
    <Container
      maxWidth="md"
      className="bg-white m-8 p-8 rounded-lg shadow-md"
    >
      <h1 className="font-bold text-2xl">
        Welcome to your ClusterSense Dashboard!
      </h1>
      <h1 className="mb-4">...</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row items-center pb-6">
          <p className="mb-0 mr-2 text-xl">
            Enter your JMX port for your Kafka Cluster:{' '}
          </p>
          <TextField
            className="port"
            type="text"
            value={port}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPort(e.target.value)
            }
          />
        </div>
        <div>
          <Button
            variant="contained"
            type="submit"
            className="gradient-background"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}
      </form>
    </Container>
  );
};

export default PortForm;