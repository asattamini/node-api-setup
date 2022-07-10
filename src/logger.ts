import winston from 'winston';
import newrelicFormatter from '@newrelic/winston-enricher';
const formatter = newrelicFormatter(winston);

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.label({ label: 'testing new relic ok!' }),
        formatter()
    ),
    transports: [new winston.transports.Console()],
});

export default logger;
