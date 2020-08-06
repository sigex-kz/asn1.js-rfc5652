const asn1 = require('asn1.js');
const rfc5280 = require('asn1.js-rfc5280');

// AttributeValue ::= ANY
const AttributeValue = asn1.define('AttributeValue', function define() {
  this.any();
});
exports.AttributeValue = AttributeValue;

// Attribute ::= SEQUENCE {
//   attrType OBJECT IDENTIFIER,
//   attrValues SET OF AttributeValue }
const Attribute = asn1.define('Attribute', function define() {
  this.seq().obj(
    this.key('attrType').objid(),
    this.key('attrValues').use(AttributeValue),
  );
});
exports.Attribute = Attribute;

// UnsignedAttributes ::= SET SIZE (1..MAX) OF Attribute
const UnsignedAttributes = asn1.define('UnsignedAttributes', function define() {
  this.setof(Attribute);
});
exports.UnsignedAttributes = UnsignedAttributes;

// SignatureValue ::= OCTET STRING
const SignatureValue = asn1.define('SignatureValue', function define() {
  this.octstr();
});
exports.SignatureValue = SignatureValue;

// SignatureAlgorithmIdentifier ::= AlgorithmIdentifier
const SignatureAlgorithmIdentifier = asn1.define('SignatureAlgorithmIdentifier', function define() {
  this.use(rfc5280.AlgorithmIdentifier);
});
exports.SignatureAlgorithmIdentifier = SignatureAlgorithmIdentifier;

// SignedAttributes ::= SET SIZE (1..MAX) OF Attribute
const SignedAttributes = asn1.define('SignedAttributes', function define() {
  this.setof(Attribute);
});
exports.SignedAttributes = SignedAttributes;

// CertificateSerialNumber ::= INTEGER
const CertificateSerialNumber = asn1.define('CertificateSerialNumber', function define() {
  this.int();
});
exports.CertificateSerialNumber = CertificateSerialNumber;

// DigestAlgorithmIdentifier ::= AlgorithmIdentifier
const DigestAlgorithmIdentifier = asn1.define('DigestAlgorithmIdentifier', function define() {
  this.use(rfc5280.AlgorithmIdentifier);
});
exports.DigestAlgorithmIdentifier = DigestAlgorithmIdentifier;

// IssuerAndSerialNumber ::= SEQUENCE {
//   issuer Name,
//   serialNumber CertificateSerialNumber }
const IssuerAndSerialNumber = asn1.define('IssuerAndSerialNumber', function define() {
  this.seq().obj(
    this.key('issuer').use(rfc5280.Name),
    this.key('serialNumber').use(CertificateSerialNumber),
  );
});
exports.IssuerAndSerialNumber = IssuerAndSerialNumber;

// SignerIdentifier ::= CHOICE {
//   issuerAndSerialNumber IssuerAndSerialNumber,
//   subjectKeyIdentifier [0] SubjectKeyIdentifier }
const SignerIdentifier = asn1.define('SignerIdentifier', function define() {
  this.choice({
    issuerAndSerialNumber: this.use(IssuerAndSerialNumber),
  });
});
exports.SignerIdentifier = SignerIdentifier;

// CMSVersion ::= INTEGER  { v0(0), v1(1), v2(2), v3(3), v4(4), v5(5) }
const CMSVersion = asn1.define('CMSVersion', function define() {
  this.int({
    0: 'v0',
    1: 'v1',
    2: 'v2',
    3: 'v3',
    4: 'v4',
    5: 'v5',
  });
});
exports.CMSVersion = CMSVersion;

// SignerInfo ::= SEQUENCE {
//   version CMSVersion,
//   sid SignerIdentifier,
//   digestAlgorithm DigestAlgorithmIdentifier,
//   signedAttrs [0] IMPLICIT SignedAttributes OPTIONAL,
//   signatureAlgorithm SignatureAlgorithmIdentifier,
//   signature SignatureValue,
//   unsignedAttrs [1] IMPLICIT UnsignedAttributes OPTIONAL }
const SignerInfo = asn1.define('SignerInfo', function define() {
  this.seq().obj(
    this.key('version').use(CMSVersion),
    this.key('sid').use(SignerIdentifier),
    this.key('digestAlgorithm').use(DigestAlgorithmIdentifier),
    this.key('signedAttrs').implicit(0).optional().use(SignedAttributes),
    this.key('signatureAlgorithm').use(SignatureAlgorithmIdentifier),
    this.key('signature').use(SignatureValue),
    this.key('unsignedAttrs').implicit(1).optional().use(UnsignedAttributes),
  );
});
exports.SignerInfo = SignerInfo;

// SignerInfos ::= SET OF SignerInfo
const SignerInfos = asn1.define('SignerInfos', function define() {
  this.setof(SignerInfo);
});
exports.SignerInfos = SignerInfos;

// CertificateChoices ::= CHOICE {
//   certificate Certificate,
//   extendedCertificate [0] IMPLICIT ExtendedCertificate, -- Obsolete
//   v1AttrCert [1] IMPLICIT AttributeCertificateV1,       -- Obsolete
//   v2AttrCert [2] IMPLICIT AttributeCertificateV2,
//   other [3] IMPLICIT OtherCertificateFormat }
const CertificateChoices = asn1.define('CertificateChoices', function define() {
  this.choice({
    certificate: this.use(rfc5280.Certificate),
  });
});
exports.CertificateChoices = CertificateChoices;

// CertificateSet ::= SET OF CertificateChoices
const CertificateSet = asn1.define('CertificateSet', function define() {
  this.setof(CertificateChoices);
});
exports.CertificateSet = CertificateSet;

// ContentType ::= OBJECT IDENTIFIER
const ContentType = asn1.define('ContentType', function define() {
  this.objid({
    '1 2 840 113549 1 7 1': 'id-data',
    '1 2 840 113549 1 7 2': 'id-signedData',
  });
});
exports.ContentType = ContentType;

// EncapsulatedContentInfo ::= SEQUENCE {
//   eContentType ContentType,
//   eContent [0] EXPLICIT OCTET STRING OPTIONAL }
const EncapsulatedContentInfo = asn1.define('EncapsulatedContentInfo', function define() {
  this.seq().obj(
    this.key('eContentType').use(ContentType),
    this.key('eContent').explicit(0).optional().octstr(),
  );
});
exports.EncapsulatedContentInfo = EncapsulatedContentInfo;

// DigestAlgorithmIdentifiers ::= SET OF DigestAlgorithmIdentifier
const DigestAlgorithmIdentifiers = asn1.define('DigestAlgorithmIdentifiers', function define() {
  this.setof(DigestAlgorithmIdentifier);
});
exports.DigestAlgorithmIdentifiers = DigestAlgorithmIdentifiers;

// id-signedData OBJECT IDENTIFIER ::= { iso(1) member-body(2)
//   us(840) rsadsi(113549) pkcs(1) pkcs7(7) 2 }
//
// SignedData ::= SEQUENCE {
//   version CMSVersion,
//   digestAlgorithms DigestAlgorithmIdentifiers,
//   encapContentInfo EncapsulatedContentInfo,
//   certificates [0] IMPLICIT CertificateSet OPTIONAL,
//   crls [1] IMPLICIT RevocationInfoChoices OPTIONAL,
//   signerInfos SignerInfos }
const SignedData = asn1.define('SignedData', function define() {
  this.seq().obj(
    this.key('version').use(CMSVersion),
    this.key('digestAlgorithms').use(DigestAlgorithmIdentifiers),
    this.key('encapContentInfo').use(EncapsulatedContentInfo),
    this.key('certificates').implicit(0).optional().use(CertificateSet),
    // this.key('crls').implicit(1).optional().use(RevocationInfoChoices),
    this.key('signerInfos').use(SignerInfos),
  );
});
exports.SignedData = SignedData;

// ContentInfo ::= SEQUENCE {
//   contentType ContentType,
//   content [0] EXPLICIT ANY DEFINED BY contentType }
const ContentInfo = asn1.define('ContentInfo', function define() {
  this.seq().obj(
    this.key('contentType').use(ContentType),
    this.key('content').explicit(0).use(SignedData),
  );
});
exports.ContentInfo = ContentInfo;
