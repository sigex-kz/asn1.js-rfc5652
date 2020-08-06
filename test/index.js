const assert = require('assert');
const fs = require('fs');

const rfc5652 = require('..');

describe('asn1.js RFC5652', () => {
  it('should decode EC CMS', () => {
    const data = fs.readFileSync(`${__dirname}/fixtures/ec-cms.pem`, { encoding: 'utf8' });

    const cms = rfc5652.ContentInfo.decode(data, 'pem', { label: 'CMS' });

    assert.equal(cms.content.version, 'v1');
    assert.equal(cms.contentType, 'id-signedData');

    assert.equal(cms.content.encapContentInfo.eContentType, 'id-data');
    assert.equal(cms.content.encapContentInfo.eContent, null);

    assert.equal(cms.content.signerInfos[0].signatureAlgorithm.algorithm.join('.'), '1.2.840.10045.4.3.2');
  });

  it('should encode EC CMS', () => {
    const data = fs.readFileSync(`${__dirname}/fixtures/ec-cms.pem`, { encoding: 'utf8' });

    const cms = rfc5652.ContentInfo.decode(data, 'pem', { label: 'CMS' });
    const encodedData = `${rfc5652.ContentInfo.encode(cms, 'pem', { label: 'CMS' })}\n`;

    assert.equal(encodedData, data);
  });

  it('should decode EC CMS with embedded data', () => {
    const data = fs.readFileSync(`${__dirname}/fixtures/ec-cms-embedded.pem`, { encoding: 'utf8' });

    const cms = rfc5652.ContentInfo.decode(data, 'pem', { label: 'CMS' });

    assert.equal(cms.content.version, 'v1');
    assert.equal(cms.contentType, 'id-signedData');

    assert.equal(cms.content.encapContentInfo.eContentType, 'id-data');
    assert.notEqual(cms.content.encapContentInfo.eContent, null);

    assert.equal(cms.content.signerInfos[0].signatureAlgorithm.algorithm.join('.'), '1.2.840.10045.4.3.2');
  });

  it('should encode EC CMS with embedded data', () => {
    const data = fs.readFileSync(`${__dirname}/fixtures/ec-cms-embedded.pem`, { encoding: 'utf8' });

    const cms = rfc5652.ContentInfo.decode(data, 'pem', { label: 'CMS' });
    const encodedData = `${rfc5652.ContentInfo.encode(cms, 'pem', { label: 'CMS' })}\n`;

    assert.equal(encodedData, data);
  });

  it('should decode RSA CMS', () => {
    const data = fs.readFileSync(`${__dirname}/fixtures/rsa-cms.pem`, { encoding: 'utf8' });

    const cms = rfc5652.ContentInfo.decode(data, 'pem', { label: 'CMS' });

    assert.equal(cms.content.version, 'v1');
    assert.equal(cms.contentType, 'id-signedData');

    assert.equal(cms.content.encapContentInfo.eContentType, 'id-data');
    assert.equal(cms.content.encapContentInfo.eContent, null);

    assert.equal(cms.content.signerInfos[0].signatureAlgorithm.algorithm.join('.'), '1.2.840.113549.1.1.1');
  });

  it('should encode RSA CMS', () => {
    const data = fs.readFileSync(`${__dirname}/fixtures/rsa-cms.pem`, { encoding: 'utf8' });

    const cms = rfc5652.ContentInfo.decode(data, 'pem', { label: 'CMS' });
    const encodedData = `${rfc5652.ContentInfo.encode(cms, 'pem', { label: 'CMS' })}\n`;

    assert.equal(encodedData, data);
  });

  it('should decode RSA CMS with embedded data', () => {
    const data = fs.readFileSync(`${__dirname}/fixtures/rsa-cms-embedded.pem`, { encoding: 'utf8' });

    const cms = rfc5652.ContentInfo.decode(data, 'pem', { label: 'CMS' });

    assert.equal(cms.content.version, 'v1');
    assert.equal(cms.contentType, 'id-signedData');

    assert.equal(cms.content.encapContentInfo.eContentType, 'id-data');
    assert.notEqual(cms.content.encapContentInfo.eContent, null);

    assert.equal(cms.content.signerInfos[0].signatureAlgorithm.algorithm.join('.'), '1.2.840.113549.1.1.1');
  });

  it('should encode RSA CMS with embedded data', () => {
    const data = fs.readFileSync(`${__dirname}/fixtures/rsa-cms-embedded.pem`, { encoding: 'utf8' });

    const cms = rfc5652.ContentInfo.decode(data, 'pem', { label: 'CMS' });
    const encodedData = `${rfc5652.ContentInfo.encode(cms, 'pem', { label: 'CMS' })}\n`;

    assert.equal(encodedData, data);
  });
});
