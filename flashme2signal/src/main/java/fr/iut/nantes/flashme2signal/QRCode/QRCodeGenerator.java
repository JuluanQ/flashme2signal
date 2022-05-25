package fr.iut.nantes.flashme2signal.QRCode;

import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

public class QRCodeGenerator {

    public void generateQR(String data, String qrName) throws WriterException, IOException {

        Map<EncodeHintType, Object> hintMap = new HashMap<>();

        hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
        hintMap.put(EncodeHintType.MARGIN, 0);

        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix bitMatrix = null;
        ByteArrayOutputStream os = new ByteArrayOutputStream();

        try {
            // Create a qr code with the url as content and a size of WxH px
            bitMatrix = writer.encode(data, BarcodeFormat.QR_CODE, 500, 500, hintMap);

            // Load QR image
            BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix, getMatrixConfig());

            // Load logo image
            BufferedImage overly = getOverly("QR LOGO PATH");

            // Calculate the delta height and width between QR code and logo
            int deltaHeight = qrImage.getHeight() - overly.getHeight();
            int deltaWidth = qrImage.getWidth() - overly.getWidth();

            // Initialize combined image
            BufferedImage combined = new BufferedImage(qrImage.getHeight(), qrImage.getWidth(), BufferedImage.TYPE_INT_ARGB);
            Graphics2D g = (Graphics2D) combined.getGraphics();

            // Write QR code to new image at position 0/0
            g.drawImage(qrImage, 0, 0, null);
            g.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, 1f));

            // Write logo into combine image at position (deltaWidth / 2) and
            // (deltaHeight / 2). Background: Left/Right and Top/Bottom must be
            // the same space for the logo to be centered
            g.drawImage(overly, (int) Math.round(deltaWidth / 2), (int) Math.round(deltaHeight / 2), null);

            // Write combined image as PNG to OutputStream
            ImageIO.write(combined, "png", os);
            // Store Image
            Files.copy( new ByteArrayInputStream(os.toByteArray()), Paths.get("QRCODE DIR" + qrName + ".png"), StandardCopyOption.REPLACE_EXISTING);
        } catch (WriterException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private BufferedImage getOverly(String LOGO) throws IOException {
        return ImageIO.read(new File(LOGO));
    }

    private MatrixToImageConfig getMatrixConfig() {
        // ARGB Colors
        // Check Colors ENUM
        return new MatrixToImageConfig(QRCodeGenerator.Colors.WHITE.getArgb(), QRCodeGenerator.Colors.BLACK.getArgb());
    }

    public enum Colors {

        WHITE(0xFFFFFFFF),
        BLACK(0xFF000000);

        private final int argb;

        Colors(final int argb){
            this.argb = argb;
        }

        public int getArgb(){
            return argb;
        }
    }

}
