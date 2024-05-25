import { ConsumptionClassificationEnum } from '../../../enums/consumption-classification.enum';
import { ConnectionTypeEnum } from '../../../enums/connection-type.enum';
import { TaxModalityEnum } from '../../../enums/tax-modality.enum';
import { SubConsumptionClassificationEnum } from '../../../enums/sub-consumption-classification.enum';

export default interface EligibilityVerificationRequest {
  documentNumber: string;
  connectionType: ConnectionTypeEnum;
  consumptionClassification: ConsumptionClassificationEnum;
  subConsumptionClassification: SubConsumptionClassificationEnum;
  taxModality: TaxModalityEnum;
  historyItems: number[];
}
