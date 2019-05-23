import { DummyProcessingInstruction } from './dummy/dummy-processing-instruction';
import { NodeTypeTS } from './node-types';

export class ProcessingInstructionImpl extends DummyProcessingInstruction {
  target: string;
  tagName: string; // todo: this might be uneccessary

  constructor() {
    super();
    this.nodeType = NodeTypeTS.PROCESSING_INSTRUCTION_NODE;
  }
}
