/* Simple CSV Generator
 * ...
 */
class CSV {
  data = [];

  config = {
    separator: ';',
    lineEnd: '\r\n',
    fileName: 'myData.csv',
  };

  header = [];

  rows = [];

  csvContent = '';

  constructor(data, config) {
    this.setConfig(config);
    this.setData(data);
    this.generate();
  }

  generate = () => {
    const { separator, lineEnd, columns } = this.config;

    this.header = columns.map(({ label }) => label);

    // eslint-disable-next-line arrow-body-style
    this.rows = this.data.map((obj) => {
      return columns.map(({ key }) => obj[key]);
    });

    const dataString = [this.header, ...this.rows]
      .reduce((acc, rowArray) => {
        const row = rowArray.join(separator || this.defaultSeparator);
        return acc + row + lineEnd;
      }, '');
    this.csvContent = `data:text/csv;charset=utf-8,${dataString}`;
  }

  download = () => {
    const encodedUri = encodeURI(this.csvContent);
    const link = document.createElement('a');

    link.setAttribute('href', encodedUri);
    link.setAttribute('download', this.config.fileName);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  setData = (data) => {
    this.data = data;
  }

  setConfig = (config) => {
    Object.assign(this.config, config);
  }
}

export default CSV;
