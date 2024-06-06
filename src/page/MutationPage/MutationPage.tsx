import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomInput } from "../../shared/components/CustomInput/CustomInput";
import { StarRating } from "../../shared/components/StarRating/StarRating";
import { SuccessModal } from "../../shared/components/SuccessModal/SuccessModal";
import { useCreateReceipt } from "../../utils/hooks/useCreateReceipt";
import { useEditReceipt } from "../../utils/hooks/useEditReceipt";
import { useInputValue } from "../../utils/hooks/useInputValue";
import { useReceiptById } from "../../utils/hooks/useReceiptById";

export const MutationPage = () => {
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading: editLoading, editReceipt } = useEditReceipt({
    onOpen: onOpen,
  });
  const { loading, createReceipt } = useCreateReceipt({ onOpen: onOpen });
  const { data, loading: byIdLoading } = useReceiptById({
    id: Number(id) ?? 0,
  });

  const {
    value: title,
    setValue: setTitle,
    error: titleError,
    handleInputFocus: handleTitleFocus,
    handleInputBlur: handleTitleBlur,
    handleInputReset: handleTitleReset,
  } = useInputValue<string>({
    initialValue: "",
  });

  const {
    value: subtitle,
    setValue: setSubtitle,
    error: subtitleError,
    handleInputBlur: handleSubtitleBlur,
    handleInputFocus: handleSubtitleFocus,
    handleInputReset: handleSubtitleReset,
  } = useInputValue({ initialValue: "" });

  const {
    value: price,
    setValue: setPrice,
    error: priceError,
    handleInputBlur: handlePriceBlur,
    handleInputFocus: handlePriceFocus,
    handleInputReset: handlePriceReset,
  } = useInputValue({ initialValue: "" });

  const {
    value: cookingTime,
    setValue: setCookingTime,
    error: cookingTimeError,
    handleInputBlur: handleCookingTimeBlur,
    handleInputFocus: handleCookingTimeFocus,
    handleInputReset: handleCookingTimeReset,
  } = useInputValue({ initialValue: "" });

  const {
    value: image,
    setValue: setImage,
    error: imageError,
    handleInputBlur: handleImageBlur,
    handleInputFocus: handleImageFocus,
    handleInputReset: handleImageReset,
  } = useInputValue({ initialValue: "" });

  const validateForm = () => {
    if (!title || !subtitle || !price || !cookingTime || !image) {
      return false;
    }
    if (Number(price) <= 0) {
      return false;
    }
    if (Number(cookingTime) <= 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (id) {
      editReceipt({
        title,
        subtitle,
        price,
        rating,
        cookingTime: `${cookingTime} mins`,
        imageUrl: image,
        imageAlt: "IMAGE ALT",
        id: Number(id),
      });
    } else {
      createReceipt({
        title,
        subtitle,
        price,
        rating,
        cookingTime: `${cookingTime} mins`,
        imageUrl: image,
        imageAlt: "IMAGE ALT",
      });
    }
  };

  useEffect(() => {
    if (!id) return;

    setTitle(data?.title ?? "");
    setPrice(String(data?.price) ?? "");
    setSubtitle(data?.subtitle ?? "");
    setCookingTime(String(parseInt(data?.cookingTime ?? "")) ?? "");
    setImage(data?.imageUrl ?? "");
    setRating(data?.rating ?? 0);
  }, [id, data]);

  if (byIdLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <>
      <Box p={8}>
        <VStack spacing={8} align="stretch">
          <Heading textAlign="center">
            {id ? "Edit Receipt" : "Create Receipt"}
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <GridItem>
              <CustomInput
                value={title}
                setValue={setTitle}
                error={titleError}
                handleInputBlur={handleTitleBlur}
                handleInputFocus={handleTitleFocus}
                handleInputReset={handleTitleReset}
                placeholder="Title"
                type="text"
              />
              <CustomInput
                value={subtitle}
                setValue={setSubtitle}
                error={subtitleError}
                handleInputBlur={handleSubtitleBlur}
                handleInputFocus={handleSubtitleFocus}
                handleInputReset={handleSubtitleReset}
                placeholder="Subtitle"
                type="text"
              />
            </GridItem>
            <GridItem>
              <CustomInput
                value={price}
                setValue={setPrice}
                error={priceError}
                handleInputBlur={handlePriceBlur}
                handleInputFocus={handlePriceFocus}
                handleInputReset={handlePriceReset}
                placeholder="Price"
                type="number"
              />
              <CustomInput
                value={cookingTime}
                setValue={setCookingTime}
                error={cookingTimeError}
                handleInputBlur={handleCookingTimeBlur}
                handleInputFocus={handleCookingTimeFocus}
                handleInputReset={handleCookingTimeReset}
                placeholder="Cooking Time"
                type="number"
              />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <CustomInput
                value={image}
                setValue={setImage}
                error={imageError}
                handleInputBlur={handleImageBlur}
                handleInputFocus={handleImageFocus}
                handleInputReset={handleImageReset}
                placeholder="Image URL"
                type="text"
              />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <StarRating
                hover={hover}
                setHover={setHover}
                rating={rating}
                setRating={setRating}
              />
            </GridItem>
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <Button
                isDisabled={!validateForm()}
                loadingText="Loading..."
                isLoading={loading || editLoading}
                onClick={handleSubmit}
                colorScheme="teal"
                w="100%"
              >
                {id ? "Edit receipt" : "Add receipt"}
              </Button>
            </GridItem>
          </Grid>
        </VStack>
      </Box>
      <SuccessModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
