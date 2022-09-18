import proto from '../../utils/table_data_proto';
import Cell from '../table-parts/cell';

const columnsSrc = proto.fakeColumns;

export function renderCells(rowElement, row) {
  columnsSrc.forEach((column, i) => {
    new Cell(rowElement, column, row, i);
  });
}
