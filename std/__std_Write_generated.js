// automatically generated by the FlatBuffers compiler, do not modify

/**
 * @const
 * @namespace
 */
var __std = __std || {};

/**
 * @enum
 */
__std.Format = {
  Auto: 0,
  JSON: 1,
  YAML: 2
};

/**
 * @constructor
 */
__std.WriteArgs = function() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
};

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {__std.WriteArgs}
 */
__std.WriteArgs.prototype.__init = function(i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {__std.WriteArgs=} obj
 * @returns {__std.WriteArgs}
 */
__std.WriteArgs.getRootAsWriteArgs = function(bb, obj) {
  return (obj || new __std.WriteArgs).__init(bb.readInt32(bb.position()) + bb.position(), bb);
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
__std.WriteArgs.prototype.path = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
__std.WriteArgs.prototype.value = function(optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
};

/**
 * @returns {__std.Format}
 */
__std.WriteArgs.prototype.type = function() {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? /** @type {__std.Format} */ (this.bb.readInt8(this.bb_pos + offset)) : __std.Format.Auto;
};

/**
 * @returns {number}
 */
__std.WriteArgs.prototype.indent = function() {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? this.bb.readInt8(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
__std.WriteArgs.startWriteArgs = function(builder) {
  builder.startObject(4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} pathOffset
 */
__std.WriteArgs.addPath = function(builder, pathOffset) {
  builder.addFieldOffset(0, pathOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} valueOffset
 */
__std.WriteArgs.addValue = function(builder, valueOffset) {
  builder.addFieldOffset(1, valueOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {__std.Format} type
 */
__std.WriteArgs.addType = function(builder, type) {
  builder.addFieldInt8(2, type, __std.Format.Auto);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} indent
 */
__std.WriteArgs.addIndent = function(builder, indent) {
  builder.addFieldInt8(3, indent, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
__std.WriteArgs.endWriteArgs = function(builder) {
  var offset = builder.endObject();
  return offset;
};

// Exports for ECMAScript6 Modules
export {__std};
