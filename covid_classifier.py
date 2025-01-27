import tensorflow
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Conv2D, MaxPool2D , Flatten
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
from tensorflow.keras.models import save_model
from tensorflow.keras.applications import VGG19


def scheduler(epoch, lr):
    if epoch < 10:
      print(f'epoch = {epoch} lr = {lr}')
      return lr
    else:
      lr * tensorflow.math.exp(-0.1)
      print(f'epoch = {epoch} lr = {lr}')
      return lr


model = Sequential()
# model.add(Conv2D(input_shape=(224,224,3),filters=64,kernel_size=(3,3),padding="same", activation="relu"))
model.add(Conv2D(input_shape=(224,224,1),filters=64,kernel_size=(3,3),padding="same", activation="relu"))
model.add(Conv2D(filters=64,kernel_size=(3,3),padding="same", activation="relu"))
model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
model.add(Conv2D(filters=32, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=32, kernel_size=(3,3), padding="same", activation="relu"))
model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
model.add(Conv2D(filters=64, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=64, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=64, kernel_size=(3,3), padding="same", activation="relu"))
model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
model.add(Conv2D(filters=128, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=128, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=128, kernel_size=(3,3), padding="same", activation="relu"))
model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))
model.add(Conv2D(filters=128, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=128, kernel_size=(3,3), padding="same", activation="relu"))
model.add(Conv2D(filters=128, kernel_size=(3,3), padding="same", activation="relu"))
model.add(MaxPool2D(pool_size=(2,2),strides=(2,2)))


model.add(Flatten())
model.add(Dense(units=4096,activation="relu"))
model.add(Dense(units=4096,activation="relu"))
model.add(Dense(units=2, activation="softmax"))

# model.add(tensorflow.keras.applications.VGG19(include_top=True,classes=3,classifier_activation="softmax"))

optimizer=tensorflow.keras.optimizers.Adam(learning_rate=0.0001)

model.compile(loss='categorical_crossentropy', optimizer='sgd')

model.summary()


gen=ImageDataGenerator(rescale=1.0/255)
ffd=gen.flow_from_directory('C:/BEProject/ResizedImages(Covid)', batch_size=4, color_mode='grayscale',target_size=(224,224))

gentest=ImageDataGenerator(rescale=1.0/255)
ffdtest=gentest.flow_from_directory('C:/BEProject/testdata', batch_size=4, color_mode='grayscale',target_size=(224,224))



callback1 = tensorflow.keras.callbacks.EarlyStopping(monitor='loss', restore_best_weights=True, patience=10, min_delta=0.0001)
callback2 = tensorflow.keras.callbacks.ModelCheckpoint('covid_model',monitor='loss', save_best_only=True, period=5)
# callback3 = tensorflow.keras.callbacks.LearningRateScheduler(scheduler)
# callback3=tensorflow.keras.callbacks.ReduceLROnPlateau(monitor='loss', factor=0.95, patience=2, verbose=1, mode='auto',
#     min_delta=0.0001, cooldown=2, min_lr=0
# )

model.fit(ffd, epochs=100, validation_data=ffdtest, callbacks=[callback1, callback2])

save_model(model,'covid_model.h5')

result=model.evaluate(ffd)

print(result)