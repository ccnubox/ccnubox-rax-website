import request from  "../box-ui/util/request";

const siteService ={
    getSites(option){
        return request({
            method:"GET",
            url:"https://ccnubox.muxixyz.com/api/site/"
        })
    }
}
export default siteService;