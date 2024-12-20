"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const date_fns_tz_1 = require("date-fns-tz");
const email_service_1 = require("../email/email.service");
const helper_1 = require("../helper");
const image_size_1 = __importDefault(require("image-size"));
const pdf_to_png_converter_1 = require("pdf-to-png-converter");
const pdfkit_1 = __importDefault(require("pdfkit"));
const utils_1 = require("../utils");
const common_const_1 = require("../utils/common.const");
const prisma_service_1 = require("./../prisma/prisma.service");
let PdfService = class PdfService {
    constructor(prisma, azure, email) {
        this.prisma = prisma;
        this.azure = azure;
        this.email = email;
    }
    async generateUserReport(transaction_id, webhook) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { transaction_id },
            include: {
                created_by: true,
                recipient: {
                    include: {
                        country: { select: { currency: true, country_name: true } },
                    },
                },
                beneficiary: true,
                invoice: true,
                order: true,
            },
        });
        const originalname = `report-${webhook}-${transaction.created_by.user_id}.pdf`;
        const doc = new pdfkit_1.default();
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', async () => {
            const pdfBuffer = Buffer.concat(buffers);
            const file = {
                originalname,
                mimetype: 'application/pdf',
                buffer: pdfBuffer,
                size: 616234,
                encoding: '7bit',
                fieldname: 'reconciliation-report',
            };
            const azureResponse = await this.azure.uploadFile(file, 'reconciliation-report');
            const attachment = await this.prisma.attachment.create({
                data: {
                    ...azureResponse,
                    container_name: 'reconciliation-report',
                    report_transaction: { connect: { transaction_id } },
                },
            });
            await this.email.send({
                to: transaction.recipient.email,
                subject: 'pdf report',
                body: `
        Dear ${transaction.recipient.first_name},
  
        Here is the consolidated reconciliation report on the cross-border remittance received by you from ${transaction.created_by.first_name} on ${transaction.created_at}. Please click on the link below to download the same.
  
        Best regards,
        Fanam-pay
      `,
                attachments: {
                    filename: attachment.file_name,
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                },
            });
        });
        doc.fontSize(15).text('Transaction Report', { align: 'center' });
        doc.moveDown();
        const columnWidth1 = 150;
        const columnWidth2 = 400;
        const rowHeight = 20;
        const startX = 50;
        let currentY = 120;
        const drawCell = (x, y, width, height, text) => {
            doc.rect(x, y, width, height).stroke();
            doc.fontSize(12).text(text, x + 5, y + 5, { width: width - 10 });
        };
        const addSectionHeader = (header) => {
            doc.fontSize(12).text(header, startX, currentY);
            currentY += rowHeight;
        };
        addSectionHeader('Transaction');
        let purpose;
        if (transaction.purpose) {
            switch (transaction.purpose) {
                case utils_1.TransactionPurpose.GOODS_PURCHASE:
                    purpose = 'Goods Purchase';
                    break;
                case utils_1.TransactionPurpose.HOSPITAL:
                    purpose = 'Hospital';
                    break;
                case utils_1.TransactionPurpose.IMPORT_AND_EXPORT:
                    purpose = 'Import and Export';
                    break;
                case utils_1.TransactionPurpose.INSURANCE:
                    purpose = 'Insurance';
                    break;
                case utils_1.TransactionPurpose.LEGAL_FEES:
                    purpose = 'Legal Fees';
                    break;
                case utils_1.TransactionPurpose.LIVING_EXPENSE:
                    purpose = 'Living Expense';
                    break;
                case utils_1.TransactionPurpose.PAYROLL_AND_PENSION:
                    purpose = 'Payroll and Pension';
                    break;
                case utils_1.TransactionPurpose.RENT:
                    purpose = 'Rent';
                    break;
                case utils_1.TransactionPurpose.RETAIL:
                    purpose = 'Retail';
                    break;
                case utils_1.TransactionPurpose.TRAVEL:
                    purpose = 'Travel';
                    break;
                case utils_1.TransactionPurpose.TUITION_FEE:
                    purpose = 'Tuition Fee';
                    break;
                case utils_1.TransactionPurpose.OTHERS:
                    purpose = 'Others';
                    break;
            }
        }
        let recipientTimeZone;
        for (const country of common_const_1.COUNTRIES_AND_TIME_ZONES) {
            if (country.countryName === transaction.recipient.country.country_name) {
                recipientTimeZone = country.timezone;
            }
        }
        const createdAtRecipientTime = (0, date_fns_tz_1.toZonedTime)(transaction.created_at, recipientTimeZone);
        const formattedDate = (0, date_fns_tz_1.format)(createdAtRecipientTime, 'dd/MM/yyyy hh:mm a', {
            timeZone: recipientTimeZone,
        });
        const transactionData = [
            { label: 'Transaction ID', value: transaction.order.order_no || 'N/A' },
            {
                label: 'Sent On',
                value: formattedDate || 'N/A',
            },
            {
                label: 'Payment Status',
                value: transaction.order.order_status === 'Transaction_success'
                    ? 'Transaction Success'
                    : 'N/A',
            },
            {
                label: 'Remittance Amount',
                value: transaction.destination_amount || 'N/A',
            },
            {
                label: 'Purpose',
                value: purpose || 'N/A',
            },
        ];
        transactionData.forEach((data) => {
            drawCell(startX, currentY, columnWidth1, rowHeight, data.label);
            drawCell(startX + columnWidth1, currentY, columnWidth2, rowHeight, data.value);
            currentY += rowHeight;
        });
        addSectionHeader(' ');
        addSectionHeader('Sender');
        const senderData = [
            {
                label: 'Account Type',
                value: transaction.sender_account_type || 'N/A',
            },
            {
                label: 'First Name',
                value: transaction.created_by.first_name || 'N/A',
            },
            {
                label: 'Last Name',
                value: transaction.created_by.last_name || 'N/A',
            },
            {
                label: 'Email',
                value: transaction.created_by.email || 'N/A',
            },
            {
                label: 'Phone No',
                value: transaction.created_by.phone_no || 'N/A',
            },
            {
                label: 'Address Line 1',
                value: transaction.created_by.address_line_1 || 'N/A',
            },
            {
                label: 'Address Line 2',
                value: transaction.created_by.address_line_2 || 'N/A',
            },
        ];
        senderData.forEach((data) => {
            if (data.value.length > 50) {
                drawCell(startX, currentY, columnWidth1, rowHeight + 10, data.label);
                drawCell(startX + columnWidth1, currentY, columnWidth2, rowHeight + 10, data.value);
                currentY += rowHeight + 10;
            }
            else {
                drawCell(startX, currentY, columnWidth1, rowHeight, data.label);
                drawCell(startX + columnWidth1, currentY, columnWidth2, rowHeight, data.value);
                currentY += rowHeight;
            }
        });
        addSectionHeader(' ');
        addSectionHeader('Recipient');
        let relation = transaction.recipient.is_same_person
            ? transaction.recipient.relationship
            : 'N/A';
        if (relation &&
            relation !== 'N/A' &&
            Object.values(utils_1.Relationship).includes(relation)) {
            switch (relation) {
                case utils_1.Relationship.AUNTY:
                    relation = 'Aunty';
                    break;
                case utils_1.Relationship.BROTHER:
                    relation = 'Brother';
                    break;
                case utils_1.Relationship.BROTHER_IN_LAW:
                    relation = 'Brother in Law';
                    break;
                case utils_1.Relationship.COUSIN:
                    relation = 'Cousin';
                    break;
                case utils_1.Relationship.DAUGHTER:
                    relation = 'Daughter';
                    break;
                case utils_1.Relationship.FATHER:
                    relation = 'Father';
                    break;
                case utils_1.Relationship.FATHER_IN_LAW:
                    relation = 'Father in Law';
                    break;
                case utils_1.Relationship.FRIEND:
                    relation = 'Friend';
                    break;
                case utils_1.Relationship.GRANDFATHER:
                    relation = 'Grandfather';
                    break;
                case utils_1.Relationship.GRANDMOTHER:
                    relation = 'Grandmother';
                    break;
                case utils_1.Relationship.MOTHER:
                    relation = 'Mother';
                    break;
                case utils_1.Relationship.MOTHER_IN_LAW:
                    relation = 'Mother in Law';
                    break;
                case utils_1.Relationship.NEPHEW:
                    relation = 'Nephew';
                    break;
                case utils_1.Relationship.NIECE:
                    relation = 'Niece';
                    break;
                case utils_1.Relationship.NOT_APPLICABLE:
                    relation = 'Not Applicable';
                    break;
                case utils_1.Relationship.SISTER:
                    relation = 'Sister';
                    break;
                case utils_1.Relationship.SISTER_IN_LAW:
                    relation = 'Sister in Law';
                    break;
                case utils_1.Relationship.SON:
                    relation = 'Son';
                    break;
                case utils_1.Relationship.UNCLE:
                    relation = 'Uncle';
                    break;
                case utils_1.Relationship.OTHERS:
                    relation = 'Others';
                    break;
            }
        }
        const recipientData = [
            {
                label: 'Account Type',
                value: transaction.recipient_account_type || 'N/A',
            },
            {
                label: 'First Name',
                value: transaction.recipient.first_name || 'N/A',
            },
            {
                label: 'Last Name',
                value: transaction.recipient.last_name || 'N/A',
            },
            {
                label: 'Email',
                value: transaction.recipient.email || 'N/A',
            },
            {
                label: 'Phone No',
                value: transaction.recipient.phone_no || 'N/A',
            },
            {
                label: 'Address Line 1',
                value: transaction.recipient.address_line_1 || 'N/A',
            },
            {
                label: 'Address Line 2',
                value: transaction.recipient.address_line_2 || 'N/A',
            },
            {
                label: 'Relationship',
                value: relation || 'N/A',
            },
        ];
        recipientData.forEach((data) => {
            if (data.value.length > 50) {
                drawCell(startX, currentY, columnWidth1, rowHeight + 10, data.label);
                drawCell(startX + columnWidth1, currentY, columnWidth2, rowHeight + 10, data.value);
                currentY += rowHeight + 10;
            }
            else {
                drawCell(startX, currentY, columnWidth1, rowHeight, data.label);
                drawCell(startX + columnWidth1, currentY, columnWidth2, rowHeight, data.value);
                currentY += rowHeight;
            }
        });
        currentY += 10;
        if (transaction.recipient.is_same_person) {
            doc
                .fontSize(14)
                .text('Both Recipient and Beneficiary are the same.', startX, currentY, {
                align: 'left',
                width: columnWidth1 + columnWidth2,
            });
        }
        if (transaction.beneficiary && !transaction.recipient.is_same_person) {
            doc.addPage();
            currentY = 50;
            addSectionHeader('Beneficiary');
            const beneficiaryData = [
                {
                    label: 'First Name',
                    value: transaction?.beneficiary?.first_name || 'N/A',
                },
                {
                    label: 'Last Name',
                    value: transaction?.beneficiary?.last_name || 'N/A',
                },
                {
                    label: 'Email',
                    value: transaction?.beneficiary?.email || 'N/A',
                },
                {
                    label: 'Phone No',
                    value: transaction?.beneficiary?.phone_no || 'N/A',
                },
                {
                    label: 'Address',
                    value: transaction?.beneficiary?.address || 'N/A',
                },
                {
                    label: 'Relationship',
                    value: transaction?.beneficiary?.relationship || 'N/A',
                },
                {
                    label: 'Notes',
                    value: transaction?.beneficiary?.notes || 'N/A',
                },
            ];
            beneficiaryData.forEach((data) => {
                if (data.value.length > 50) {
                    drawCell(startX, currentY, columnWidth1, rowHeight + 10, data.label);
                    drawCell(startX + columnWidth1, currentY, columnWidth2, rowHeight + 10, data.value);
                    currentY += rowHeight + 10;
                }
                else {
                    drawCell(startX, currentY, columnWidth1, rowHeight, data.label);
                    drawCell(startX + columnWidth1, currentY, columnWidth2, rowHeight, data.value);
                    currentY += rowHeight;
                }
            });
        }
        const imageX = 50;
        const imageY = currentY + 20;
        const imageWidth = 200;
        const imageHeight = 100;
        const imageFiles = [];
        if (transaction.invoice.length) {
            for (const invoice of transaction.invoice) {
                const { attachment_id, file_name, mime } = invoice;
                const url = this.azure.generateSASUrl(file_name, 'invoice');
                imageFiles.push({
                    mime,
                    attachment_id,
                    url,
                    file_name,
                });
            }
            const pdfBuffers = [];
            for (const imageFile of imageFiles) {
                if (imageFile.url) {
                    const response = await axios_1.default.get(imageFile.url, {
                        responseType: 'arraybuffer',
                    });
                    if (imageFile.mime === 'Pdf') {
                        const pdfBuffer = Buffer.from(response.data, 'binary');
                        pdfBuffers.push(pdfBuffer);
                    }
                    else {
                        const pageWidth = 595.28;
                        const pageHeight = 841.89;
                        const imageBuffer = Buffer.from(response.data, 'binary');
                        const dimensions = (0, image_size_1.default)(imageBuffer);
                        const imageWidth = dimensions.width;
                        const imageHeight = dimensions.height;
                        const scaleX = pageWidth / imageWidth;
                        const scaleY = pageHeight / imageHeight;
                        const scaleMin = Math.min(scaleX, scaleY);
                        const scaleMax = Math.max(scaleX, scaleY);
                        const scale = (scaleMax - scaleMin) * 1.5;
                        const imageX = (pageWidth - imageWidth * scaleMin * 0.75) / 2;
                        const imageY = (pageHeight - imageHeight * scaleMin * 0.75) / 2;
                        try {
                            doc.addPage();
                            const imageBuffer = Buffer.from(response.data, 'binary');
                            doc.image(imageBuffer, imageX, imageY, {
                                width: imageWidth * scaleMin * 0.75,
                                height: imageHeight * scaleMin * 0.75,
                            });
                        }
                        catch (error) {
                            console.error('Error fetching the image:', error);
                        }
                    }
                }
                else {
                    console.log('Image file not found:', imageFile.url);
                }
            }
            const imageBuffers = [];
            for (const pdfBuffer of pdfBuffers) {
                try {
                    const pngPages = await (0, pdf_to_png_converter_1.pdfToPng)(pdfBuffer, {
                        viewportScale: 1.0,
                        disableFontFace: false,
                        useSystemFonts: false,
                        enableXfa: false,
                        outputFolder: null,
                    });
                    imageBuffers.push(...pngPages);
                }
                catch (error) {
                    console.error('error coverting pdf to image:', error);
                }
            }
            for (const imageBuffer of imageBuffers) {
                try {
                    doc.addPage();
                    const imageX = 50;
                    const imageY = 50;
                    const imageWidth = 500;
                    doc.image(imageBuffer.content, imageX, imageY, { width: imageWidth });
                }
                catch (error) {
                    console.error('Error fetching the image:', error);
                }
            }
        }
        doc.end();
        return true;
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        helper_1.AzureHelper,
        email_service_1.EmailService])
], PdfService);
//# sourceMappingURL=pdf.service.js.map