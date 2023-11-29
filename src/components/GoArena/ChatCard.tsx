{/* <>
<Card>
    <CardBody>
        <h2 className='text-center mb-4'>Update Game Player Profile</h2>
        <div>{currentUser?.email}</div>
        {error && <Alert status="error"  >{error}</Alert>}
        <form onSubmit={handleSubmit} >
            <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" ref={nameRef} required placeholder='required as game handle' ></Input>
            </FormControl>
            <FormControl id="location">
                <FormLabel>Location</FormLabel>
                <Input type="text" ref={locationRef} placeholder='optional city or country'></Input>
            </FormControl>
            <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                <Input type="text" ref={bioRef} placeholder='optional inroduction information' ></Input>
            </FormControl>
            <FormControl id="rank">
                <FormLabel>Rank Information</FormLabel>
                <Input type="text" ref={rankInfoRef} placeholder='optional rank information' ></Input>
            </FormControl>
            <Button disabled={loading} className='w-100 mt-4' type="submit">Save</Button>
        </form>
    </CardBody>
</Card> */}