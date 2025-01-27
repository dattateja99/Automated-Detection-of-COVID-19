from tensorflow.keras.models import load_model
from PIL.Image import open
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os
model = None

def img(n):
    global model
    if model == None:
        print(os.getcwd())
        model=load_model('C:/BEProject/covid_model1')
        model.summary()


    print(n)
    image = open(n)
    image=image.convert('L')
    image=image.resize((224,224))
    pixels=img_to_array(image)
    pixels=pixels.reshape((224,224,1))
    pixels/=255.0
    pixels=np.array([pixels])
    print(pixels.shape)
    classes=model.predict(pixels)
    print(classes)
    print(np.argmax(classes))
    ci=np.argmax(classes)
    return ci,str(classes[0][ci]*100)


def classify_img(pixels):
    classes=model.predict(pixels)
    # print(np.argmax(classes[0]))
    # return np.argmax(classes[0])
    return classes

'''
if __name__=="__main__":
    gen=ImageDataGenerator(rescale=1.0/255)
    # ffd=gen.flow_from_directory('C:/BEProject/ResizedImages(Covid)', batch_size=10, color_mode='grayscale',target_size=(224,224))
    ffd=gen.flow_from_directory('C:/BEProject/testdata', batch_size=10, color_mode='grayscale',target_size=(224,224))

    tp=0
    fp=0
    fn=0

    count = 0

    for images, clas in ffd:
        count += 1
        if count%100 == 0 :
            print(count)

        if count % 500 ==0:
            break

        pcla = classify_img(images)
        #print(clas,pcla)
        for pi, ai in zip(pcla, clas):
            ai = np.argmax(ai)
            pi = np.argmax(pi)

            # print(ai,pi)

            if ai == 1:
                if pi == 1:
                    tp += 1
                else:
                    fn += 1
            else:
                if pi == 1:
                    fp += 1

    # print ('tp',tp)
    # print ('fp',fp)
    # print ('fn',fn)

    precision = tp / (tp+fp)
    recall = tp / (tp+fn)

    fvalue = 2*precision*recall/(precision+recall)

    print('precision',precision)
    print('recall',recall)
    print('fvalue',fvalue)

    exit()
'''
# img('C:/BEProject/Sample_Images/NonCovid1.jpg')
# img('C:/BEProject/Sample_Images/NonCovid2.jpg')
# img('C:/BEProject/Sample_Images/NonCovid3.jpg')
# img('C:/BEProject/Sample_Images/NonCovid4.jpg')
# img('C:/BEProject/Sample_Images/NonCovid5.jpg')
# img('C:/BEProject/Sample_Images/NonCovid6.jpg')
# img('C:/BEProject/Sample_Images/NonCovid7.jpg')
# img('C:/BEProject/Sample_Images/NonCovid8.jpg')
# img('C:/BEProject/Sample_Images/NonCovid9.jpg')
# img('C:/BEProject/Sample_Images/NonCovid10.jpg')
# img('C:/BEProject/Sample_Images/NonCovid11.jpg')
# img('C:/BEProject/Sample_Images/NonCovid12.jpg')
# img('C:/BEProject/Sample_Images/NonCovid13.png')
# img('C:/BEProject/Sample_Images/NonCovid14.jpeg')
# img('C:/BEProject/Sample_Images/Covid1.jpg')
# img('C:/BEProject/Sample_Images/Covid2.jpg')
# img('C:/BEProject/Sample_Images/Covid3.jpg')
# img('C:/BEProject/Sample_Images/Covid4.jpg')
# img('C:/BEProject/Sample_Images/Covid5.jpg')
# img('C:/BEProject/Sample_Images/Covid6.jpeg')
# img('C:/BEProject/Sample_Images/Covid7.jpg')
# img('C:/BEProject/Sample_Images/Covid8.jpg')
# img('C:/BEProject/Sample_Images/Covid9.jpg')
# img('C:/BEProject/Sample_Images/pneumonia1.jpg')
# img('C:/BEProject/Sample_Images/pneumonia2.jpg')
# img('C:/BEProject/Sample_Images/pneumonia3.jpg')
# img('C:/BEProject/Sample_Images/pneumonia4.jpg')
# img('C:/BEProject/Sample_Images/pneumonia5.jpg')
# img('C:/BEProject/Sample_Images/PNEUMONIA(34).jpg')

