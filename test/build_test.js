const { expect } = require('chai');
const execa = require('execa');
const fs = require('fs');

const expectedOutput = `:root {
  --color-white: #fff;
  --color-gray-100: #f4f6f8;
  --color-gray-200: #ebeef2;
  --color-gray-300: #dce0e6;
  --color-gray-400: #bec4cc;
  --color-gray-500: #8f949f;
  --color-gray-600: #6a707a;
  --color-gray-700: #42474f;
  --color-gray-800: #2b2d34;
  --color-gray-900: #1c1e24;
  --color-black: #000;
  --color-white-40: rgba(255, 255, 255, 0.4);
}

body {
  background-color: #8f949f;
  background-color: var(--color-gray-500);
}
`;

describe('basic tests', function () {
  it('has the expected output in vendor css after building in three-seventeen', async () => {
    await execa('ember', ['build'], {
      cwd: './apps/three-seventeen'
    });

    let data = fs.readFileSync('./apps/three-seventeen/dist/assets/vendor.css').toString();

    expect(data).to.equal(expectedOutput);
  });

  it('has the expected output in vendor css after building in three-eighteen', async () => {
    await execa('ember', ['build'], {
      cwd: './apps/three-eighteen'
    });

    let data = fs.readFileSync('./apps/three-eighteen/dist/assets/vendor.css').toString();

    expect(data).to.equal(expectedOutput);
  });
});