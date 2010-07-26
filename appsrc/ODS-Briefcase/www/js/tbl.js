/*
 *
 *  This file is part of the OpenLink Software Virtuoso Open-Source (VOS)
 *  project.
 *
 *  Copyright (C) 1998-2010 OpenLink Software
 *
 *  This project is free software; you can redistribute it and/or modify it
 *  under the terms of the GNU General Public License as published by the
 *  Free Software Foundation; only version 2 of the License, dated June 1991.
 *
 *  This program is distributed in the hope that it will be useful, but
 *  WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 *  General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
*/

TBL.createCell40 = function (td, prefix, fldName, No, fldOptions)
{
  var fld = new OAT.Combolist([], fldOptions.value, {name: fldName});
  fld.input.name = fldName;
  fld.input.id = fldName;
  fld.input.style.width = "85%";
  fld.addOption('xml-sql');
  fld.addOption('xml-sql-root');
  fld.addOption('xml-sql-dtd');
  fld.addOption('xml-sql-schema');
  fld.addOption('xml-sql-description');
  fld.addOption('xml-sql-encoding');
  fld.addOption('xml-stylesheet');
  fld.addOption('xml-template');
  fld.addOption('xper');

  td.appendChild(fld.div);
  return fld;
}

TBL.createCell41 = function (td, prefix, fldName, No, fldOptions) {
	var fld = OAT.Dom.create("select");
	fld.name = fldName;
	fld.id = fldName;
	TBL.selectOption(fld, fldOptions.value, "Set", "U");
	TBL.selectOption(fld, fldOptions.value, "Remove", "R");

  td.appendChild(fld);
  return fld;
}

TBL.createCell42 = function (td, prefix, fldName, No, fldOptions) {
	var fld = OAT.Dom.create("select");
	fld.name = fldName;
	fld.id = fldName;
	TBL.selectOption(fld, fldOptions.value, "Personal", "person");
	TBL.selectOption(fld, fldOptions.value, "Group", "group");
	TBL.selectOption(fld, fldOptions.value, "Public", "public");
  if (fldOptions.onchange)
    fld.onclick = fldOptions.onchange;

  td.appendChild(fld);
  return fld;
}

TBL.createCell43 = function (td, prefix, fldName, No, fldOptions)
{
  var fld = TBL.createCell0 (td, prefix, fldName, No, fldOptions)
  td.appendChild(OAT.Dom.text(' '));
  var img = OAT.Dom.image('/ods/images/select.gif');
  img.id = fldName+'_img';
  img.className = "pointer";
  img.onclick = function (){webidShow(fld)};
  if (fldOptions.imgCssText)
    img.style.cssText = fldOptions.imgCssText;

  td.appendChild(img);
  return fld;
}

TBL.createCell44 = function (td, prefix, fldName, No, fldOptions, disabled) {
  function cb(td, prefix, fldName, No, fldOptions, disabled, ndx) {
  	var fld = OAT.Dom.create("input");
    fld.type = 'checkbox';
    fld.id = fldName;
    fld.name = fld.id;
    fld.value = 1;
    if (fldOptions.value && fldOptions.value[ndx])
      fld.checked = true;
    if (fldOptions.onclick)
      fld.onclick = fldOptions.onclick;
    if (disabled)
      fld.disabled = disabled;
    td.appendChild(fld);
  }
  var suffix = '';
  if (fldOptions.suffix)
    suffix = fldOptions.suffix;
  cb(td, prefix, fldName+'_r'+suffix, No, fldOptions, disabled, 0);
  cb(td, prefix, fldName+'_w'+suffix, No, fldOptions, disabled, 1);
  cb(td, prefix, fldName+'_x'+suffix, No, fldOptions, disabled, 2);
}

TBL.createCell45 = function (td, prefix, fldName, No, fldOptions) {
	var fld = OAT.Dom.create("select");
	fld.name = fldName;
	fld.id = fldName;
	TBL.selectOption(fld, fldOptions.value, 'This object only', 0);
	if (fldOptions.objectType == 'C') {
	TBL.selectOption(fld, fldOptions.value, 'This object, subfolders and files', 1);
	TBL.selectOption(fld, fldOptions.value, 'Subfolders and files', 2);
  }

  td.appendChild(fld);
  return fld;
}

TBL.viewCell44 = function (td, prefix, fldName, No, fldOptions) {
  TBL.createCell44(td, prefix, fldName, No, fldOptions, true);
}

TBL.clickCell44 = function (fld)
{
  var fldName = fld.name;
  if (fldName.indexOf('_deny') != -1) {
    fldName = fldName.replace('_deny', '_grant');
    fldName = fldName.replace('fld_4', 'fld_3');
  }
  else if (fldName.indexOf('_grant') != -1) {
    fldName = fldName.replace('_grant', '_deny');
    fldName = fldName.replace('fld_3', 'fld_4');
  }
  $(fldName).checked = false;
}

TBL.changeCell42 = function (srcFld) {
  var srcValue = $v(srcFld.name);
  var dstName = srcFld.name.replace('fld_1', 'fld_2');
  var dstFld = $(dstName);
  var dstImg = $(dstName+'_img');
  if (srcValue == 'public') {
    dstFld.value = 'foaf:Agent';
    dstFld.readOnly = true;
  } else {
    if (dstFld.value == 'foaf:Agent')
      dstFld.value = '';
    dstFld.readOnly = false;
  }
  if (srcValue == 'public') {
    OAT.Dom.hide(dstImg);
  } else {
    OAT.Dom.show(dstImg);
  }
}
