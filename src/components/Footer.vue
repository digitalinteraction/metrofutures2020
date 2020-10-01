<template>
    <!--    todo currently temp logos-->
    <div class="footer" >
        <div class="w-100" id="footer">
            <div class="w-100 footer-container">
                <div class="footer-logo footer-left">
                    <div class="sub-logo">
                        <b-img fluid id="nexus" alt="Nexus Logo" src="../assets/nexuslogoBW.png"></b-img>
                    </div>
                    
                    <div class="sub-logo">
                        <b-img fluid id="stadler" alt="Stadler Logo" src="../assets/stadlerLogoBW.svg"></b-img>
                    </div>
                </div>
                <div class="footer-logo footer-openlab" id="lab">
                    <a href="https://openlab.ncl.ac.uk/"><b-img fluid id="openlab" alt="Open Lab Logo" src="../assets/openlabLogoBlack.svg"></b-img></a>
                </div>
                <div class="footer-logo footer-center-left">
                    <div class="test">
                    <p><a href="#" v-b-modal.privacy-modal>Privacy Policy</a></p>
                    </div>
                </div>
                <div class="footer-logo footer-center-right">
                    <p><a href="#" v-b-modal.terms-modal>Terms &amp; Conditions</a></p>
                </div>
                
            </div>
        </div>
        <!-- Compontents for modals are in menu 
        <Privacy/>
        <Terms/> -->
    </div>

</template>

<script>
//    import Privacy from "@/components/Privacy";
 //   import Terms from "@/components/Terms";

    export default {
        name: 'Footer',
        components: {
  //          Privacy,
 //           Terms
        }
    }
</script>

<style scoped lang="scss">
    .footer {
        position: relative;
    }
    #stadler-logo {
        padding-left: 0.5em;
    }
    #nexus{
        max-width: 40%;
    }
    #stadler {
        max-width: 75%;
    }
    #openlab {
        max-width: 30%;
    }
    .footer-openlab {
        margin-top: auto;
        margin-bottom: auto;
        text-align :right;
    }


p {
     margin: 0;
        font-family: "Open Sans", Arial,serif;
        font-size: small;
}
.footer-container {
    display: flex;
    flex-direction: row;
    
    .footer-logo {
        margin-top: auto;
        margin-bottom: auto;
        flex: 1;
        a {
            color: black;
        }
    }

    .footer-left{
        display: flex;
        flex-direction: row;
        align-items: center;
        .sub-logo {
            flex: 1;
        }
    }

    .footer-center-left {
        p{
            text-align: right;
            padding-right: 5%;
            
        }
        div {
            border-right: 2px solid #FEC600;
        }
    }

    .footer-center-right {
        
        p{
            padding-left: 5%;
            text-align: left
        }
    }

    .footer-openlab {
        p{
            text-align: right;
        }
    }
}
    
      
@media all and (max-width:800px) //800px for tablets and phones.
{
    .footer-container {
        flex-direction: column;
        .footer-logo {
            width:100%;
            text-align: center;
            p{
                text-align: center;
                padding: 0%;
            }   
            div {
            border: none;
        }
        }
        .footer-left{
        display: flex;
        flex-direction: column;
        .sub-logo {
            flex: 1;
        }
    }
    }

    #nexus{
        max-width: 8%;
    }
    #stadler {
        max-width: 50%;
    }
    #openlab {
        max-width: 15%;
    }
}

</style>
